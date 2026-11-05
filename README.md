# Hotel Suraj Heritage — Static Website Demo

Open `index.html` in your browser. No build step, package manager or backend is needed.

## Design
Custom Shekhawati-inspired editorial design, not the visual design from any prior hotel project. HTML, CSS and JavaScript are local. Font and example photographs require internet.

## Media and facts — IMPORTANT
- **No actual Hotel Suraj Heritage photos or videos have been downloaded.** The hotel room and dining photos are *illustrative stock images* served remotely from Unsplash. They are **not this hotel**.
- The Shekhawati photos depict the region, **not the hotel**. They use CC-licensed Wikimedia Commons photography, attributed in the footer, with image cropping. They currently load remotely; consider saving and self-hosting the source files while preserving license notices. Remote images may fail if blocked or offline.
- A *locally included* `assets/videos/suraj-heritage-brand-film.mp4` is a 12-second **original illustrated motion graphic**, and **not actual hotel footage**. Poster: `assets/images/film-poster.svg`.
- Photos and videos of the **actual hotel** should ideally be supplied by the owner or obtained with explicit permission. Avoid scraping private/non-reusable media from Google Maps, booking engines or social platforms.
- The restaurant, air-conditioning, free Wi-Fi, parking and 24-hour reception are reported by a travel listing: https://www.travel4u.com.tw/en/hotel/detail/v2/4588738/ . Confirm all details before publishing. Do not invent prices, room types, guest reviews, contact numbers, or availability.
- Shekhawati context: https://www.tourism.rajasthan.gov.in/content/rajasthan-tourism/en/tourist-destinations/shekhawati.html
- Location: user-provided Google Maps listing, near Dhod Circle, Bikaner Bypass Rd, Sikar, Rajasthan 332001. Map coordinates: 27.598948, 75.115307.

## Replacing media
1. Put licensed hotel photos in `assets/images/` (`hero.webp`, `room.webp`, `dining.webp`, etc.).
2. Change image URLs in `index.html` and the `.hero-photo` style in `style.css` to local relative paths.
3. Replace `assets/videos/suraj-heritage-brand-film.mp4` with authorised actual hotel footage, or modify the video file path in `index.html`.
4. Remove the illustrative media disclaimers **only when photos and videos are confirmed authentic**.

## Functionality
Mobile navigation, animated sections, filterable gallery, image viewer, locally hosted video player, responsive layout, maps/directions, and enquiry text builder with copy button.

**The form does not send a message, process payment, check availability or create a reservation.** It prepares text for a user to copy and share with the hotel. To enable live enquiries, connect a verified hotel contact and a consent-aware backend or messaging platform.

## Photo sources (illustrative only)
- https://unsplash.com/ (sample hotel bedroom `photo-1582719478250-c89cae4dc85b`)
- https://unsplash.com/ (sample restaurant `photo-1552566626-52f8b828add9`)
- [Shekhawati painted houses](https://commons.wikimedia.org/wiki/File:Shekhawati_painted_houses.jpg) by **Ahron de Leeuw**, Creative Commons [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/); displayed with cropping.
- [Morarka Haveli Museum, Nawalgarh - 13](https://commons.wikimedia.org/wiki/File:Morarka_Haveli_Museum,_Nawalgarh_-_13.jpg) by **Thérèse Gaigé**, Creative Commons [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); displayed with cropping.

For the final website, replace all off-site media with approved locally hosted assets.
