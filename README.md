# Video Player with Notes

## Overview

This project implements a responsive video player that allows users to play YouTube videos and save notes corresponding to specific timestamps of the video. The notes feature includes functionalities such as adding, editing, and deleting notes. Notes are saved in local storage and are linked to the specific video being watched.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/video-player-with-notes.git
   cd video-player-with-notes
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Rename env.sample to env.local**

   ```plaintext
   .env.local
   ```

4. **Add your Environment variable to `.env.local`:**

   ```plaintext
   NEXT_PUBLIC_API= https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&key=AIzaSyA7577UFBkZ4J9mxF0sK2lCFeP_1Hc85ug&q=mathongo
   ```

5. **Run the development server:**

   ```bash
   npm run dev
   ```

6. **Open the app in your browser:**
   ```
   http://localhost:3000
   ```

## Features

### Video Player

- Embed a YouTube video player that can play any YouTube video.
- The video can be changed based on a provided video ID.

### Notes Functionality

- Users can add notes linked to specific timestamps in the video.
- Each note includes:
  - A timestamp (clickable to jump to that point in the video).
  - The date the note was created.
  - The note content.
- Users can edit and delete notes.

### Local Storage

- Save notes in the local storage.
- Notes are tied to the video ID, so changing the video displays the corresponding notes for the new video ID.

### Bonus Features

- Allow the user to upload images along with the textual content (saved as base64 locally).
- Provide an HTML editor to add notes with options to format text (bold, italics, underline, color).

## Tech Stack

- **Next.js 14**
- **Tailwind CSS**
- **shadcn/ui**
- **React Quill**
- **React YouTube**
- **YouTube API**

## Usage

1. **Home Page:**

   - The home page displays a list of videos. Click on any video to go to the video player page.

2. **Video Player Page:**

   - The video player page allows you to watch the selected YouTube video.
   - You can add a new note by clicking the "Add new Note" button.
   - Each note appears in the list below the video, showing the timestamp, date, and content.
   - Click on the timestamp to jump to that point in the video.
   - Edit or delete notes using the respective buttons.

3. **Notes with Images:**

   - You can upload images when adding or editing a note. The images will be displayed alongside the note content.

4. **Rich Text Editing:**
   - The note editor supports rich text formatting, including bold, italics, underline, and color.

## Screenshots

_Include some screenshots of your application here._

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Quill](https://github.com/zenoamaro/react-quill)
- [React YouTube](https://github.com/troybetz/react-youtube)
- [YouTube API](https://developers.google.com/youtube/v3)

## Contact

For any inquiries, please reach out at atif276ali@gmail.com.
