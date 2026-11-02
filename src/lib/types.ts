export type EventItem = {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
  createdAt: string;
};

export type EventTypeCount = {
  type: string;
  count: number;
}

export type JoinedItem = {
  _id: string;
  eventId: string;
  joinedAt: string;
  event: EventItem;
};