import { c as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, f as createAstro, b as renderComponent, a as renderHead, g as renderSlot } from './astro/server_1hIIhLnJ.mjs';
import 'kleur/colors';
/* empty css                          */
import 'clsx';

const $$Astro$2 = createAstro();
const $$Links = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Links;
  const { link } = Astro2.props;
  function linkAddress() {
    switch (link) {
      case "Home":
        return "/";
      case "About":
        return "/about/";
      case "Blog":
        return "/blog/";
      case "Tags":
        return "/tags/";
    }
  }
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(linkAddress(), "href")}><button class="bttn primary">${link}</button></a>`;
}, "G:/Projects/Websites/justind.kim/src/components/Links.astro", undefined);

const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="w-100 flex justify-center"> ${renderComponent($$result, "Links", $$Links, { "link": "Home" })} ${renderComponent($$result, "Links", $$Links, { "link": "About" })} ${renderComponent($$result, "Links", $$Links, { "link": "Blog" })} ${renderComponent($$result, "Links", $$Links, { "link": "Tags" })} </nav>`;
}, "G:/Projects/Websites/justind.kim/src/components/Navigation.astro", undefined);

const $$Astro$1 = createAstro();
const $$Social = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Social;
  const { platform, username } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`https://www.${platform}.com/${username}`, "href")} class="underline" target="_blank">${platform}</a>`;
}, "G:/Projects/Websites/justind.kim/src/components/Social.astro", undefined);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="bottom-0"> <hr class="w-3/4 mx-auto my-4"> <p>created with astro 🚀</p> <p>learn more about my projects on <a${addAttribute(`https://www.github.com/kimjustind`, "href")} class="underline" target="_blank">GitHub</a>!</p> ${renderComponent($$result, "Social", $$Social, { "platform": "LinkedIn", "username": "in/kimjustind" })} </footer>`;
}, "G:/Projects/Websites/justind.kim/src/components/Footer.astro", undefined);

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-37fxchfa> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/x-icon" href="/favicon.ico"><title>${title}</title>${renderHead()}</head> <body data-astro-cid-37fxchfa> ${renderComponent($$result, "Navigation", $$Navigation, { "data-astro-cid-37fxchfa": true })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-37fxchfa": true })} </body></html>`;
}, "G:/Projects/Websites/justind.kim/src/layouts/BaseLayout.astro", undefined);

export { $$BaseLayout as $ };
