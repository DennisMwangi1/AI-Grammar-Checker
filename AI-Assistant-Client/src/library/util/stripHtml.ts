export const stripHtml = (html: any) => html.replace(/<\/?[^>]+(>|$)/g, "");
