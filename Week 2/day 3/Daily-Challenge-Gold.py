# Users info
def get_user_data(num_entries=5):
    """Collect name, age, and score from the user num_entries times."""
    data = []
    for i in range(num_entries):
        print(f"\nEntry {i + 1} of {num_entries}")
        name = input("Name: ")
        age = input("Age: ")
        score = input("Score: ")
        data.append((name, age, score))
    return data


def main():
    people = get_user_data(5)

    # Sort by Name > Age > Score using a lambda as the key function
    people.sort(key=lambda person: (person[0], person[1], person[2]))

    print("\nSorted result:")
    print(people)


if __name__ == "__main__":
    main()