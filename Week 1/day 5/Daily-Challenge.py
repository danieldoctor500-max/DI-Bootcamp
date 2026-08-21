#1: Sorting
words = input("Enter words separated by commas: ")
word_list = words.split(",")
word_list.sort()
sorted_words = ",".join(word_list)

print(sorted_words)

#2: Longest words
def longest_word(sentence):
    # Split the sentence into words
    words = sentence.split()

    # Start with the first word as the longest
    longest = words[0]

    # Check every word
    for word in words:
        if len(word) > len(longest):
            longest = word

    # Return the longest word
    return longest


print(longest_word("Margaret's toy is a pretty doll."))
print(longest_word("A thing of beauty is a joy forever."))
print(longest_word("Forgetfulness is by all means powerless!"))