/* empty css                                 */
import { c as createComponent, r as renderTemplate, a as renderHead, b as renderComponent, d as renderScript } from '../chunks/astro/server_1hIIhLnJ.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_siL8i1LE.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.ico"><meta name="viewport" content="width=device-width">${renderHead()}</head> <body> ${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "about justin" }, { "default": ($$result2) => renderTemplate` <header class="flex flex-col justify-end items-center h-screen p-4"> <div id="intro" class="h-3/5"> <h2 id="first" class="text-2xl sm:text-4xl">hi, my name is</h2> <h1 id="second" class="text-5xl sm:text-9xl">Justin D. Kim</h1> <h3 id="secondhalf" class="text-lg sm:text-xl sm:text-right">he/him</h3> <h3 id="third" class="text-lg sm:text-xl sm:text-right">i am a software developer based in las vegas, nevada </h3><h3 id="fourth" class="text-lg sm:text-xl sm:text-right">this presentation can be found at <a href="." class="underline">https://justind.kim/about/</a></h3> </div> </header> <section id="fifth" class="flex flex-col items-center h-screen p-8"> <div class="xl:w-3/5"> <ul class="h-3/5 list-disc"> <h1 class="text-5xl md:text-6xl xl:text-8xl underline">About Me</h1> <li class="text-md md:text-xl 2xl:text-3xl mt-6">
UNR graduate with a Bachelor of Science in Business Administration with a major in Information Systems.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
I currently work at the Clark County Flood Control District as a Programmer Analyst II.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
I have worked at the City of Henderson as a Computer Analyst I where I assisted with help desk duties.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
Primarily experienced with C# and JavaScript; comfortable with Python, SQL, and learning new languages and frameworks.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
I am also comfortable using cloud service providers like Azure and AWS. I have a <a href="https://www.credly.com/badges/67ef9949-cf7a-4fcd-a7ab-d3470aa1f255" class="underline">Microsoft Certified: Azure Fundamentals certification</a>.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
I develop and play video games, my favorite game being Hollow Knight!
<img src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/367520/b2e50d3cc54ab9b248341c36fd8a368f0fb88cc7.png" width="30px" class="inline"> </li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
I am also learning to play the guitar, golf, and practicing mixology in my spare time.
</li> </ul> </div> </section> <section id="sixth" class="flex flex-col items-center h-screen p-8 w-100"> <div class="xl:w-3/5"> <h1 class="text-5xl md:text-6xl xl:text-8xl underline">Application support</h1> <ul class="h-3/5 list-disc"> <li class="text-md md:text-xl 2xl:text-3xl mt-6">
I currently develop and maintain desktop and web applications at the Clark County Flood Control District.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
Built and automated processes including documentation and financial data entry.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
Perform regular package updates and bug fixes for existing applications.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
Modernize deprecated applications to use the latest frameworks and technologies.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
Automated certain IT processes using PowerShell and Task Scheduler.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
I also have some experience with DevOps; I have used GitHub Actions and Docker.
</li> </ul> </div> </section> <section id="seventh" class="flex flex-col items-center h-screen p-8 w-100"> <div class="xl:w-3/5"> <h1 class="text-5xl md:text-6xl xl:text-8xl underline">Application lifecycle management</h1> <ul class="h-3/5 list-disc"> <li class="text-md md:text-xl 2xl:text-3xl mt-6">
My current position provides support for pre-existing applications as well as experimentation with new technologies.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
Security and accessibility are top priorities for me. Keeping up with current vulnerabilities and best practices everyday.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
Maintainability and readability are also important. I like writing clean and efficient code and documentation.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
Familiar with Agile and Scrum methodologies for project management.
</li> </ul> </div> </section> <section id="eighth" class="flex flex-col items-center h-screen p-8 w-100"> <div class="xl:w-3/5"> <h1 class="text-5xl md:text-6xl xl:text-8xl underline">Troubleshooting</h1> <ul class="h-3/5 list-disc"> <li class="text-md md:text-xl 2xl:text-3xl mt-6">
Public Information team needed an application that would help keep track of their events.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
Access to the application while on the field was important. Sounded like a good fit for a web application. Used Blazor and ASP.NET to create the app.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
Events needed to track volunteers, equipment, and supply of goodies. MS SQL Server database was used to store data.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
We needed a login to keep outsiders out and for authorization purposes. Entra ID (Azure AD) and Microsoft Graph were used.
</li> </ul> </div> </section> <section id="ninth" class="flex flex-col items-center h-screen p-8 w-100"> <div class="xl:w-3/5"> <h1 class="text-5xl md:text-6xl xl:text-8xl underline">Customer Service</h1> <ul class="h-3/5 list-disc"> <li class="text-md md:text-xl 2xl:text-3xl mt-6">
I believe the most important thing is keeping stakeholders and end users satisfied.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
At my current position, I email and set up meetings with users and keep them updated on any issues or changes.
</li> <li class="text-md md:text-xl 2xl:text-3xl mt-3">
Working at the help desk in City of Henderson, I was able to provide excellent customer service to users with an average satisfaction score of 98.8%.
</li> </ul> </div> </section> <section id="tenth" class="flex flex-col justify-center items-center h-screen p-8"> <h1 class="text-5xl sm:text-8xl underline hover:cursor-pointer">Thank You!</h1> </section> ` })} ${renderScript($$result, "G:/Projects/Websites/justind.kim/src/pages/about.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "G:/Projects/Websites/justind.kim/src/pages/about.astro", undefined);

const $$file = "G:/Projects/Websites/justind.kim/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
