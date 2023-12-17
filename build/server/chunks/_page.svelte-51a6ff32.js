import { c as create_ssr_component, b as add_attribute, e as escape, v as validate_component, a as each } from './ssr-3ed108ea.js';
import { B as Badge, I as Incident, C as Card, a as Card_content, R as Root, T as Trigger, H as Hover_card_content, b as Icon$1 } from './incident-e2e77291.js';
import 'clsx';
import { b as buttonVariants } from './index3-cffb6b6f.js';
import { tv } from 'tailwind-variants';
import 'tailwind-merge';
import './index2-d2b6b2d2.js';
import './helpers-fc56b344.js';
import 'moment';

const Arrow_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M5 12h14" }], ["path", { "d": "m12 5 7 7-7 7" }]];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "arrow-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ArrowRight = Arrow_right;
tv({
  base: "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11",
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive: "text-destructive border-destructive/50 dark:border-destructive [&>svg]:text-destructive text-destructive"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
const Monitor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { monitor } = $$props;
  monitor.pageData._0Day;
  let _90Day = monitor.pageData._90Day;
  let uptime0Day = monitor.pageData.uptime0Day;
  let uptime90Day = monitor.pageData.uptime90Day;
  monitor.pageData.dailyUps;
  monitor.pageData.dailyDown;
  monitor.pageData.dailyDegraded;
  let todayDD = Object.keys(_90Day)[Object.keys(_90Day).length - 1];
  if ($$props.monitor === void 0 && $$bindings.monitor && monitor !== void 0)
    $$bindings.monitor(monitor);
  return `<section class="mx-auto backdrop-blur-[2px] mb-8 flex w-full max-w-[890px] flex-1 flex-col items-start justify-center">${validate_component(Card, "Card.Root").$$render($$result, { class: "w-full" }, {}, {
    default: () => {
      return `${validate_component(Card_content, "Card.Content").$$render($$result, { class: "pb-0" }, {}, {
        default: () => {
          return `<div class="grid grid-cols-12 gap-4"><div class="col-span-12 md:col-span-4"><div class="pt-3"><div class="scroll-m-20 text-2xl font-semibold tracking-tight">${monitor.image ? `<img${add_attribute("src", monitor.image, 0)} class="w-6 h-6 inline" alt="" srcset="">` : ``} ${escape(monitor.name)} ${monitor.description ? `${validate_component(Root, "HoverCard.Root").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Trigger, "HoverCard.Trigger").$$render($$result, {}, {}, {
                default: () => {
                  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide inline lucide-info"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>`;
                }
              })} ${validate_component(Hover_card_content, "HoverCard.Content").$$render($$result, { class: "dark:invert" }, {}, {
                default: () => {
                  return `${escape(monitor.description)}`;
                }
              })}`;
            }
          })}` : ``}</div></div> ${`<div class="mt-2"><div class="grid grid-cols-2 gap-0"><div class="col-span-2"><span class="inline-flex text-muted-foreground text-sm">90 Day Uptime: ${escape(uptime90Day)}%</span></div> <div class="col-span-2"><span class="inline-flex text-muted-foreground text-sm">Today Uptime: ${escape(uptime0Day)}%</span></div> <div class="col-span-2 -mt-2"><a href="${"/incident/" + escape(monitor.folderName, true) + "#past_incident"}" class="${"pt-0 pl-0 pb-0 text-indigo-500 text-left " + escape(buttonVariants({ variant: "link" }), true)}">Recent Incidents ${validate_component(ArrowRight, "ArrowRight").$$render($$result, { size: 16 }, {}, {})}</a></div></div></div>`}</div> <div class="col-span-12 md:col-span-8 pt-2">${`<div class="grid grid-cols-12 "><div class="col-span-12 md:col-span-4 mt-2 h-[32px]"><a href="javascript:void(0);">${validate_component(Badge, "Badge").$$render(
            $$result,
            {
              variant: ""
            },
            {},
            {
              default: () => {
                return `90 Day`;
              }
            }
          )}</a> <a href="javascript:void(0);">${validate_component(Badge, "Badge").$$render($$result, { variant: "outline" }, {}, {
            default: () => {
              return `Today`;
            }
          })}</a></div> <div class="col-span-12 md:col-span-8 text-right h-[32px]">${_90Day[todayDD] ? `<div class="${"text-api-up text-sm font-semibold mt-[8px] text-" + escape(_90Day[todayDD].cssClass, true)}">${escape(_90Day[todayDD].message)}</div>` : ``}</div></div> <div class="grid grid-cols-12">${`<div class="chart-status relative mt-1 col-span-12"><div class="flex flex-wrap">${each(Object.entries(_90Day), ([ts, bar]) => {
            return `<div class="h-[30px] w-[6px] rounded-sm oneline"><div class="${"h-[30px] bg-" + escape(bar.cssClass, true) + " w-[4px] rounded-sm mr-[2px]"}"></div></div> <div class="absolute show-hover text-sm bg-background"><div class="${"text-" + escape(bar.cssClass, true) + " font-semibold"}">${bar.message != "No Data" ? `● ${escape(new Date(bar.timestamp * 1e3).toLocaleDateString())} ${escape(bar.message)}` : `● ${escape(new Date(bar.timestamp * 1e3).toLocaleDateString())} ${escape(bar.message)}`}</div> </div>`;
          })}</div></div>`}</div>`}</div></div>`;
        }
      })}`;
    }
  })}</section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let hasActiveIncidents = false;
  for (let i = 0; i < data.monitors.length; i++) {
    if (data.monitors[i].activeIncidents.length > 0) {
      hasActiveIncidents = true;
      break;
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="mt-32"></div> ${data.site.hero ? `<section class="mx-auto flex w-full max-w-4xl mb-8 flex-1 flex-col items-start justify-center"><div class="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center"><div class="mx-auto max-w-3xl text-center blurry-bg">${data.site.hero.image ? `<img${add_attribute("src", data.site.hero.image, 0)} class="h-16 w-16 m-auto" alt="" srcset="">` : ``} ${data.site.hero.title ? `<h1 class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent leading-snug">${escape(data.site.hero.title)}</h1>` : ``} ${data.site.hero.subtitle ? `<p class="mx-auto mt-4 max-w-xl sm:text-xl">${escape(data.site.hero.subtitle)}</p>` : ``}</div></div></section>` : ``} ${hasActiveIncidents ? `<section class="mx-auto backdrop-blur-[2px] mb-4 flex w-full max-w-[890px] flex-1 flex-col items-start justify-center" id=""><p class="text-xl text-muted-foreground" data-svelte-h="svelte-xncp7p">Ongoing Incidents</p> <p class="text-2xl font-bold leading-none">${validate_component(Badge, "Badge").$$render($$result, { variant: "outline text-2xl bg-red-500" }, {}, {
    default: () => {
      return `Ongoing Incidents`;
    }
  })}</p></section> <section class="mx-auto backdrop-blur-[2px] mb-8 flex w-full max-w-[890px] flex-1 flex-col items-start justify-center" id="">${each(data.monitors, (monitor) => {
    return `${each(monitor.activeIncidents, (incident, i) => {
      return `${validate_component(Incident, "Incident").$$render(
        $$result,
        {
          incident,
          state: "close",
          variant: "title+body+comments+monitor",
          monitor
        },
        {},
        {}
      )}`;
    })}`;
  })}</section>` : ``} ${data.monitors.length > 0 ? `<section class="mx-auto backdrop-blur-[2px] mb-4 flex w-full max-w-[890px] flex-1 flex-col items-start justify-center" id=""><p class="text-2xl font-bold leading-none">${validate_component(Badge, "Badge").$$render($$result, { variant: "outline text-2xl bg-red-500" }, {}, {
    default: () => {
      return `Availability per Component`;
    }
  })}</p></section> ${each(data.monitors, (monitor) => {
    return `${validate_component(Monitor, "Monitor").$$render($$result, { monitor }, {}, {})}`;
  })}` : ``}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-51a6ff32.js.map
