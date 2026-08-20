MATRIX_STR = '''
7ir
Tsi
h%x
i ?
sM# 
$a 
#t%'''

rows = MATRIX_STR.strip("\n").split("\n")
max_len = max(len(row) for row in rows)
matrix = [list(row.ljust(max_len)) for row in rows]

raw_text = ""
for col in range(max_len):
    for row in range(len(matrix)):
        raw_text += matrix[row][col]

decoded_message = ""
symbols_buffer = ""

for char in raw_text:
    if char.isalpha():
        # If we encountered non-alpha symbols and already have text, insert a space
        if symbols_buffer and decoded_message:
            decoded_message += " "
        symbols_buffer = ""
        decoded_message += char
    else:
        symbols_buffer += char

print(decoded_message)