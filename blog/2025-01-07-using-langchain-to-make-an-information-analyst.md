---
favorite: true
title: Using LangChain to make an information analyst
description: I'm working on a project with a friend that requires building "Custom GPTs" via the API
date: 2025-01-07
published: true
tags:
---
I haven't used LangChain since all the hype around it a year or so again. Time to relearn it. I'm going to refer to the LangChain entity in the abstract as "the agent."

Here are the patterns I need to implement - 
1. Requests will be made via web server requests (I'm going to implement this last)
2. End user can upload documents. 
3. The agent can read the documents and associate the information with the system prompt. 
4. The agent can search the web for additional information. 

I'm going to start with bullet 3. 

## Creating an agent that can parse and read documents 

First off, I found [this three hour LangChain crash cours](https://www.youtube.com/watch?v=yF9kGESAi3M)e on YouTube. I snagged the full video transcript using [this website](https://tactiq.io/tools/youtube-transcript) and passed it into ChatGPT o1 model. This way, I can have a conversation with the whole document. 

I then asked ChatGPT to write me a bare bones document loader /w the ability to ask questions about them to Open AI. After a little bit of massaging, I ended up with this . 

```python
from langchain_openai import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage
from langchain_community.document_loaders import PyPDFLoader, UnstructuredWordDocumentLoader
import nltk
import dotenv

dotenv.load_dotenv()
# Add these lines at the start to download required NLTK data
nltk.download('punkt')
nltk.download('punkt_tab')
nltk.download('averaged_perceptron_tagger_eng')

def load_pdf_text(pdf_path: str) -> str:
    """Load all text from a PDF file into a single string."""
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()  # returns a list of Documents
    # each Document has .page_content; concatenate them
    text_chunks = [doc.page_content for doc in documents]
    return "\n".join(text_chunks)

def load_word_text(word_path: str) -> str:
    """Load all text from a Word (.docx) file into a single string."""
    loader = UnstructuredWordDocumentLoader(word_path)
    documents = loader.load()
    text_chunks = [doc.page_content for doc in documents]
    return "\n".join(text_chunks)

def combine_texts(*all_texts) -> str:
    """Combine multiple doc strings into one big text with separators."""
    return "\n---\n".join(text.strip() for text in all_texts if text.strip())

def answer_question(system_prompt: str, doc_text: str, user_query: str) -> str:
    """
    Takes a system prompt, doc text, and user question, 
    then injects them into an LLM call, returning the final answer.
    """
    # 1. Build an LLM that can handle large contexts (gpt-4 or gpt-4-32k, for example)
    llm = ChatOpenAI(
        model_name="gpt-4o-mini",      # or "gpt-3.5-turbo-16k" / "gpt-4-32k"
        temperature=0.0
    )

    # 2. Build your combined prompt
    system_msg = SystemMessage(content=system_prompt)
    user_msg = HumanMessage(content=f"""
Here is the text from your documents:

=== DOCUMENT CONTENT START ===
{doc_text}
=== DOCUMENT CONTENT END ===

You MUST only use the above text to answer the question below.
If the answer is not in the text, say 'Not found in the document'.

User's Question:
{user_query}
""")

    # 3. Call the model
    response = llm([system_msg, user_msg])
    return response.content

if __name__ == "__main__":

    # Example usage
    # ---------------------------------------------------
    # 1. Load PDF text
    pdf_text = load_pdf_text("pdf.pdf")

    # 2. Load Word text (docx)
    word_text = load_word_text("word-doc.docx")

    # 3. Combine them all in memory
    combined_doc_text = combine_texts(pdf_text, word_text)
    
    # Example system prompt
    system_instructions = (
        "You are a helpful assistant. "
        "Answer questions based only on the provided document text. "
        "If you cannot find the answer, say so."
    )
    
    # 4. Ask a question
    user_question = "write me a summary of what the documents tell us"
    
    # 5. Get an answer from the LLM
    final_answer = answer_question(system_instructions, combined_doc_text, user_question)
    
    print("=== AI ANSWER ===")
    print(final_answer)
```

### Limitations 
1. It can't read scanned PDFs. It views them as having zero data. I'm going to have to figure that one out. 
2. There's nothing "agentic" about this, currently. It's a fixed workflow of read file 1, read file 2, summarize the files. 

More to come. 
