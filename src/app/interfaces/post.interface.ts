export interface Post {
  created: Date;
  description: string;
  image: string;
  numComments: number;
  numLikes: number;
  postedBy: {
    fullName: string;
    profilePicDownloadUrl: string;
    userId: string;
  }[];
  _id: string;
}
