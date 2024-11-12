# Post Archiver Renderer

A web application for rendering and viewing archived YouTube community posts. Built with Next.js and TypeScript.

## Features

- Drag and drop JSON file upload
- View community posts with images and comments
- Member-only post indicators
- Responsive design
- Image gallery with lightbox
- Link handling and formatting

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Get your YouTube community posts data using [post-archiver](https://github.com/sadadYes/post-archiver)
2. Drag and drop the JSON file into the web interface
3. View and interact with your archived posts

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React Markdown](https://github.com/remarkjs/react-markdown) - Content formatting

## Deployment

This project is configured for deployment on [Vercel](https://vercel.com), the platform built by the creators of Next.js. 

### Deployment Steps:
1. Fork or clone this repository
2. Create a new project on Vercel
3. In the project settings, modify the Build & Development Settings:
   - Set the Install Command to: `npm install --legacy-peer-deps`
4. Deploy the project

Alternatively, you can use the one-click deploy button below, but remember to update the Install Command in project settings after deployment:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FsadadYes%2Fpost-archiver-renderer)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
