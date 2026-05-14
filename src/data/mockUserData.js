export const mockUser = {
  id: 1,
  name: "Hamza Khan",
  email: "hamza.khan@example.com",
  phone: "+92 300 1234567",
  avatarUrl: "https://i.pravatar.cc/150?img=12",
  joinDate: "January 2024",
  bio: "Real estate enthusiast and investor looking for premium properties in Islamabad and Lahore."
};

export const mockMyListings = [
  {
    id: 101,
    title: "Modern Apartment in Gulberg",
    price: "1.5 Cr",
    location: "Gulberg III, Lahore",
    status: "active",
    image: "https://images.unsplash.com/photo-1545324418-cc6a8b87b7e0?w=600&q=80"
  },
  {
    id: 102,
    title: "Luxury Villa - Bahria Town",
    price: "4.2 Cr",
    location: "Phase 7, Rawalpindi",
    status: "pending",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80"
  }
];

export const mockSavedListings = [
  {
    id: 1,
    title: "Skyline Residences",
    price: "2.5 Cr",
    location: "DHA Phase 6, Lahore",
    savedAt: "2 days ago",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
  },
  {
    id: 2,
    title: "Marina Towers",
    price: "3.2 Cr",
    location: "Clifton, Karachi",
    savedAt: "1 week ago",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80"
  }
];

export const mockChats = [
  {
    id: 1,
    propertyName: "Skyline Residences",
    lastActive: "10:30 AM",
    messages: [
      { id: 1, sender: "owner", text: "Hello! Are you interested in a viewing?", timestamp: "10:00 AM" },
      { id: 2, sender: "me", text: "Yes, I'd like to see it this weekend.", timestamp: "10:15 AM" },
      { id: 3, sender: "owner", text: "Great! Saturday at 2 PM works for you?", timestamp: "10:30 AM" }
    ]
  },
  {
    id: 2,
    propertyName: "Green Valley Apartments",
    lastActive: "Yesterday",
    messages: [
      { id: 1, sender: "me", text: "Is the price negotiable?", timestamp: "Yesterday" },
      { id: 2, sender: "owner", text: "We can discuss it during the visit.", timestamp: "Yesterday" }
    ]
  }
];
