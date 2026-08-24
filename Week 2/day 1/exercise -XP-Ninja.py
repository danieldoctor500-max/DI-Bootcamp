class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []

    def call(self, other_phone):
        call_string = f"{self.phone_number} called {other_phone.phone_number}"
        print(call_string)
        self.call_history.append(call_string)

    def show_call_history(self):
        print(f"\n--- Call History for {self.phone_number} ---")
        for record in self.call_history:
            print(record)

    def send_message(self, other_phone, content):
        message_dict = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": content
        }
        # Save message in outgoing phone's history
        self.messages.append(message_dict)
        # Save message in incoming phone's history as well
        other_phone.messages.append(message_dict)

    def show_outgoing_messages(self):
        print(f"\n--- Outgoing Messages from {self.phone_number} ---")
        for msg in self.messages:
            if msg["from"] == self.phone_number:
                print(f"To: {msg['to']} | Content: {msg['content']}")

    def show_incoming_messages(self):
        print(f"\n--- Incoming Messages to {self.phone_number} ---")
        for msg in self.messages:
            if msg["to"] == self.phone_number:
                print(f"From: {msg['from']} | Content: {msg['content']}")

    def show_messages_from(self, sender_number):
        print(f"\n--- Messages from {sender_number} to {self.phone_number} ---")
        for msg in self.messages:
            if msg["from"] == sender_number and msg["to"] == self.phone_number:
                print(f"Content: {msg['content']}")


# --- Testing Code ---
if __name__ == "__main__":
    phone1 = Phone("123-456-7890")
    phone2 = Phone("987-654-3210")
    phone3 = Phone("555-123-4567")

    # Test Calls
    phone1.call(phone2)
    phone1.call(phone3)
    phone1.show_call_history()

    # Test Sending Messages
    phone1.send_message(phone2, "Hey! Are we still meeting today?")
    phone2.send_message(phone1, "Yes! See you at 5 PM.")
    phone3.send_message(phone1, "Hello from phone 3!")

    # Test Viewing Messages
    phone1.show_outgoing_messages()
    phone1.show_incoming_messages()
    phone1.show_messages_from("987-654-3210")