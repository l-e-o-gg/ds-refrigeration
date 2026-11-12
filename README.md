# DS Refrigeration & Catering Ltd: website design draft

A redesign proposal for [dsrefrigerationservices.ie](https://dsrefrigerationservices.ie). It is a static site (plain HTML, CSS and JavaScript, no build step), so it can be reviewed from GitHub Pages and later hosted almost anywhere.

This is a **draft for review**, not the live site. All text comes from the current website. Nothing has been invented: where information is missing (reviews, company registration number, logo, photos), the page shows a clearly marked placeholder.

## What is in the draft

- Home page with hero, emergency call-out card, services, equipment range, why DS, FAQs and contact.
- **Equipment range** with filters. There are no prices and no checkout, because the business quotes on request. Each item links to the quote request form.
- Quote form with the same enquiry types as the current site.
- Mobile call bar ("Call Don" and "Request a Quote").
- Light and dark colour schemes, reduced-motion support, keyboard focus styles.
- LocalBusiness structured data (address, phone, opening hours) for Google.

## Structure

```
index.html          page content
css/styles.css      all styling (colour tokens at the top)
js/equipment.js     the equipment list (edit this to add or change items)
js/main.js          filters, form
```

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish for review on GitHub Pages

1. Create a repository and push these files to the `main` branch.
2. In the repository go to **Settings > Pages**.
3. Under "Build and deployment" choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. After a minute the site is live at `https://<user>.github.io/<repository>/`.

## To do before going live

- [ ] Replace the text logo with the real logo, and match the brand colours (see `:root` in `css/styles.css`).
- [ ] Add real photos of equipment, premises and installations.
- [ ] Add the real Google reviews and a link to the Google profile.
- [ ] Confirm the FAQ answers and the claims in "Why DS" with Don.
- [ ] Confirm whether "24/7" emergency cover applies. The current page title says "24/7 Call", but the body text does not give hours.
- [ ] Add the company registration number and registered office in the footer, plus privacy and cookie pages. Check the exact legal requirements for Irish company websites.
- [ ] Add a cookie banner if analytics or any non-essential cookies are added.
- [ ] Connect the form to a real service. Right now it opens the visitor's email app with the enquiry pre-filled. Options: Formspree, or the host's form handler.
- [ ] Add a Google Maps embed on the contact section.
- [ ] Decide the final hosting and DNS (see below).

## Current site and hosting (findings)

- Built with **Blacknight Sitebuilder**. The page source declares **BaseKit** as the generator, and the footer says "Powered by Blacknight".
- It is not WordPress, WooCommerce, Shopify or Wix.
- It has no products or prices. All product and pricing enquiries go through the quote request.
- Pages: Home, About Us, Reviews & FAQs, Commercial Refrigeration, Catering Equipment, Air Conditioning, Servicing & Breakdowns, Contact.

## Moving to this design

A site-builder plan normally does not accept uploaded HTML files. Options:

1. **Static hosting** (this draft): GitHub Pages, Netlify or Cloudflare Pages, with the existing `.ie` domain pointed at it through DNS. Very low running cost.
2. **Blacknight web hosting** with FTP or a control panel, if the client prefers to stay with the same provider.
3. **WordPress** on any host, if the client wants to edit pages themselves.

Before choosing, confirm who holds the domain registration and DNS access, and where the business email is hosted (the site uses a Gmail address, so email should not be affected).


## Copyright and protection

- All rights reserved (see `LICENSE`). Preview only; transfer of rights happens on written agreement and full payment.
- The preview carries `noindex` so search engines do not list it.
- A browser always shows a site's HTML, CSS and JS, so code cannot be fully hidden. Real protection is the licence, the contract, and handing over the final clean version only after payment.

## Content rule

Everything on the page comes from the current website (dsrefrigerationservices.ie). Nothing is claimed that the original does not say. Still to add before launch: company registration number, privacy policy and cookie policy, real Google reviews and photos once the client provides them.

## Opening-hours indicator (js/hours.js)

Shows whether the office is open, using the published hours (Mon to Fri 09:00 to 17:00, Europe/Dublin).
