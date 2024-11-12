interface Comment {
  commenter_icon: string;
  commenter_name: string;
  timestamp: string;
  content: string;
  like_count: string;
}

interface Link {
  text: string;
  url: string;
}

interface Image {
  standard: string;
  high_res: string;
}

interface Post {
  post_url: string;
  timestamp: string;
  content: string;
  member_only: boolean;
  links: Link[];
  images: Image[];
  like_count: string;
  comment_count: string;
  comments: Comment[];
}

interface ChannelData {
  channel: string;
  channel_icon: string;
  scrape_date: string;
  scrape_timestamp: number;
  posts_count: number;
  posts: Post[];
}

export type { Comment, Link, Post, ChannelData }; 