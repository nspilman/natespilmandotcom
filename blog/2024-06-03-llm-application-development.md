---
favorite: true
title: Building an LLM application
description: Storing content as vector embeddings in Pinecone
date: 2024-06-03
published: true
---
With all the buzz about AI, my curiosity got the better of me, and I've started building myself an "AI application." I've heard a lot about [Pinecone](https://www.pinecone.io/) , a vector database used for this sort of thing. 

For example, say I have a niche biology book saved with each page as its own record. With this technology, I'll be able to query my application about a topic, have my database return the most relevant pages from the book about this topic and then pass that info along with my query to the LLM. The purpose is to potentially give the LLM information to answer about that it wasn't trained on, as well as avoiding hallucination by being explicit about the information it needs to answer about. 

## High Level Setup

Adding vector data to Pinecone - 
1. Identify and secure content to query 
2. Chunk that text into smaller pieces. Each piece will be a record in the database. 
3. Pass each chunk to an embedding model to convert the string value to a vector. 
4. Save the vector in Pinecone. store the original text content in the `metadata` section of the payload to make it easy to view the text itself on retrieval. 

Querying the data  - 
1. Construct your query 
2. Perform the same string-to-vector step as step 3 of the previous workflow. Send your string for embedding to the model. 
3. send the vector value to Pinecone, as well as the count of returns you want back. 

## Progress

### Setting up Pinecone 
So far I've created my initial Pinecone db instance. It was fast to setup, though there was a core concept I needed to understand. I needed to create an `index` for my Pinecone database - a top level collection of vector data - and needed to specify a parameter count. This count is dictated by the embedding model I planned on using, since it's the output of that model that I'm saving. I opted for OpenAI's `text-embedding-3-small` model ([more info here](https://platform.openai.com/docs/guides/embeddings/embedding-models)) , which has a size of `1536`. 

### Adding text content to the database
In my hunt for text to save to the database, I found https://gutenberg.org/, a massive repository of public domain e-books. To start, I downloaded [Romeo and Juliet](https://gutenberg.org/cache/epub/1513/pg1513.txt).

If I load the entire play into the database as a single record, this wouldn't serve much help, as I'd be passing the entire play into my LLM instead of a specific part. This is both expensive and error prone, as the model would need to parse the massive content. Therefore, I need to "chunk" it - split the text into different pieces and insert the individual pieces as individual records. 

Originally I thought I'd chunk down to individual scenes and then maybe chunk further, but that degree of precision would require a lot of work. So since this is purely for educational purposes, I decided to chunk by paragraph instead. I wrote a function in [node](https://nodejs.org/en) to create chunks of 7 paragraphs length, with a 2 paragraph overlap with the previous chunk. This follows a passing best practice I heard, in which you want some overlap in your chunks to ensure contexts is preserved. 

```typescript
 function chunkParagraphs(
      paragraphs: string[],
      chunkSize: number,
      overlapSize: number
    ): string[][] {
      const chunks: string[][] = [];
      for (let i = 0; i < paragraphs.length; i += chunkSize - overlapSize) {
        const chunk: string[] = paragraphs.slice(i, i + chunkSize);
        if (chunk.length > 0) {
          chunks.push(chunk);
        }
        if (i + chunkSize >= paragraphs.length) {
          break;
        }
      }
      return chunks;
    }
```


```typescript
const paragraphs: string[] = data.split(/\n\n+/);
const chunkSize = 7;
const overlapSize = 2;
const chunkedParagraphs: string[][] = chunkParagraphs(
      paragraphs,
      chunkSize,
      overlapSize
    );
```

Then once I have my chunks, it's time to send them to Pinecone! I loop through each chunk, send it to `openai` for create the embedding vector and then save that vector value to the database. In addition, I add the chunk to my `metadata` object. This is so that when I query the database and get my results, I can look at the raw text without needing to convert the embedding back to plain text. 

```typescript
const pc = new Pinecone({ apiKey: PINECONE_API_KEY });
const index = pc.Index(INDEX_NAME);

const chunks = await getRomeoAndJulietChunks();

chunks.forEach(async (chunk, i) => {
    const embeddingRaw = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk,
      encoding_format: "float",
    });
    
	const embedding = embeddingRaw.data[0].embedding;
	const id = "rj" + i;
	const value = {
      id,
      values: embedding,
      metadata: {
        text: chunk,
      },
    };
    
	const result = await index.upsert([value]);
})

```

### Querying the database
I can now query my database using a similar process to the initial embedding creation step. 

```typescript
  const query = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: "QUERY TEXT",
    encoding_format: "float",
  });

  const queryResponse1 = await index.query({
    topK: 3,
    vector: query.data[0].embedding,
    includeValues: false,
    includeMetadata: true,
  });

  console.log({
    queryResponse1: queryResponse1.matches.map((match) => [
      match.metadata?.text.toString(),
      match.score,
    ]),
  });
```

The above code will give me the top 3 records in the `index` that are semantically similar to my input of `QUERY INPUT`. It converts that string to its vector value, and then compares that vector value against the vectors in the database, returning the top 5 most similar. It also includes a `match score`, indicating how strongly similar the passage is to the query. 

## Demo output
Since this is `Romeo and Juliet`, I'm going to change my query input to "Our love will survive, against all odds". And the below chunk was the result with a similarity score of `0.314391255`. This is also the resulting chunk for "Our love is more important than our family.", with a score of  `0.278758824`.  I only queried for the top result, which is why I've only gotten one response. 

```text
BENVOLIO.\n' +
        'In love?\n' +
        '\n' +
        'ROMEO.\n' +
        'Out.\n' +
        '\n' +
        'BENVOLIO.\n' +
        'Of love?\n' +
        '\n' +
        'ROMEO.\n' +
        'Out of her favour where I am in love.\n' +
        '\n' +
        'BENVOLIO.\n' +
        'Alas that love so gentle in his view,\n' +
        'Should be so tyrannous and rough in proof.\n' +
        '\n' +
        'ROMEO.\n' +
        'Alas that love, whose view is muffled still,\n' +
        'Should, without eyes, see pathways to his will!\n' +
        'Where shall we dine? O me! What fray was here?\n' +
        'Yet tell me not, for I have heard it all.\n' +
        'Here’s much to do with hate, but more with love:\n' +
        'Why, then, O brawling love! O loving hate!\n' +
        'O anything, of nothing first create!\n' +
        'O heavy lightness! serious vanity!\n' +
        'Misshapen chaos of well-seeming forms!\n' +
        'Feather of lead, bright smoke, cold fire, sick health!\n' +
        'Still-waking sleep, that is not what it is!\n' +
        'This love feel I, that feel no love in this.\n' +
        'Dost thou not laugh?\n' +
        '\n' +
        'BENVOLIO.\n' +
        'No coz, I rather weep.',
```

## Parting thoughts 
The whole concept of taking a block of text, converting it to a vector and comparing other vectors against it based on meaning still feels like magic. But now, I little less, I guess. 

The main thing I want to dig deeper into is chunking strategy. I believe that if I'd chunked more finely, I would get higher similarity scores, as each chunk would smaller and more specifically about a single thing. That said, if I chunk too finely, I lose all context of the passage. 

A suggestion a friend made would be to keep my chunk size as is, but to then pass it to an LLM with the instruction of `only return the parts of this passage most related to the original prompt.` 

I'm also wondering if I can implement a sort of cascading chunking strategy where I go through the original text a bunch of times with different chunking intervals. With this strategy, I'd need to keep fine grained tracking of where in the text I am in the `metadata`. In theory, this would allow me to identify the most semantically similar chunks and then evaluate how similar the values are when I view them in larger chunk sizes. As I'm writing this, I'm unsure exactly how i'd pull this off, but it's a fun thought experiment. 

Also also - since these chunks have no knowledge of eachother, there's no overarching context. The `metadata` object exists, but I'm *pretty* sure that's not queryable, and is instead purely used to give additional information to the end user in the query response. Therefore, it might make sense to inject additional context into each chunk. In the Romeo and Juliet example, maybe a line saying `this is from act 1, scene 3`. Or maybe even a rolling summary of `here's what's happened in the play so far.` Though that sounds expensive, as for every chunk I'd need to pass in the previous summary and the new text into a llm to get the new summary. And would that mess up my query results by adding too much overarching meaning to the specific section? 

All things to experiment. It's an exciting and slightly overwhelming feeling when answering one question yields four more. 

Thanks for reading. 