---
favorite: true
title: Pitch detection variance by buffer size
description: a slighty deeper dive into the imprecise pitch detection I've seen
date: 2024-05-20
published: true
---
Since the last post, I've learned more about what's going on when I pass a 440 Hz sound to my FFT equation with a buffer size of 1,024 samples, and I get back 430.7 Hz as the result.

First, some definitions:

- The `sample rate` is the number of data points—"samples"—per second of streaming audio.
- The `buffer size` is the number of samples processed at once.
- The `bin width` is the `sample rate` divided by the `buffer size`. This value represents the frequency resolution of the FFT.

## Detected Pitch by Buffer Size

My basic understanding of how this works is that the detected pitch is the closest multiple of the `bin width`. The lower the `buffer size`, and therefore larger the `bin width`, the larger the variance from the correct value you're going to see.

I ran a quick experiment where I incremented the buffer size and evaluated the pitch. I incremented the buffer size by `2205`, since that's a factor of our sample rate of `44100`.

![Detected Pitch vs Buffer size](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-05-20%20pitch%20detection%20variance%20by%20buffer%20size/detected%20pitch%20by%20buffer%20size.jpg?t=2024-05-20T16%3A01%3A54.350Z)

Every time the buffer size is a multiple of `2205`, we get the result of `440 Hz`. This is because of the following relationship:

```python
buffer_size = 2205 sample_rate = 44100 bin_width = sample_rate / buffer_size  # 20 Hz  
target_pitch = 440 
evaluates_to_integer = target_pitch / bin_width  # 22. The target pitch is an integer multiple of the bin width
```


Because the target pitch is an integer multiple of the bin width in this instance, the FFT can accurately detect the pitch. If the target pitch were `441 Hz`, however, this would still evaluate to `440 Hz` with this buffer size.

This also means that a `buffer size` equal to the `sample rate` (`buffer_size = 44100`) results in a `bin width` of 1 Hz, meaning it can accurately report pitches to the nearest integer. If the `buffer size` were double the sample rate, the bin width would be `0.5 Hz`, and so on. In simpler terms, a buffer size equal to the sample rate means that each chunk of audio is one second long, processed one second at a time.

There are ways to optimize this, making it possible to get more precise answers with smaller buffer sizes. To be continued...

---

### Key Points:

1. **FFT Result at 430.7 Hz**: The discrepancy between 440 Hz and 430.7 Hz is due to the frequency resolution (`bin width`) determined by your buffer size.
2. **Definitions**: Clarified definitions and relationships between sample rate, buffer size, and bin width.
3. **Pitch Detection**: Explained how the detected pitch corresponds to the nearest multiple of the bin width.
4. **Experiment**: Showed that when the buffer size is a factor of the sample rate that matches the target pitch, the detection is accurate.
5. **Optimization**: Mentioned that there are methods to improve pitch detection precision even with smaller buffer sizes.