export type Series = {
  id: string;
  title: string;
  type: "Web Novel" | "Light Novel" | "Manga" | "Comic";
  author: string;
  coverImage: string;
  chaptersReleased: number;
  chaptersRead: number;
  volumesReleased?: number;
  volumesRead?: number;
  website?: string;
};

export const mockSeriesData: Series[] = [
  {
    id: "1",
    title: "Solo Leveling",
    type: "Web Novel",
    author: "Chugong",
    coverImage: "https://example.com/solo-leveling.jpg",
    chaptersReleased: 270,
    chaptersRead: 120,
    volumesReleased: 14,
    volumesRead: 6,
    website: "https://example.com/solo-leveling",
  },
  {
    id: "2",
    title: "One Piece",
    type: "Manga",
    author: "Eiichiro Oda",
    coverImage: "https://example.com/one-piece.jpg",
    chaptersReleased: 1100,
    chaptersRead: 980,
    volumesReleased: 106,
    volumesRead: 80,
    website: "https://example.com/one-piece",
  },
  {
    id: "3",
    title: "Classroom of the Elite",
    type: "Light Novel",
    author: "Shougo Kinugasa",
    coverImage: "https://example.com/cote.jpg",
    chaptersReleased: 300,
    chaptersRead: 200,
    volumesReleased: 20,
    volumesRead: 15,
    website: "https://example.com/cote",
  },
];
