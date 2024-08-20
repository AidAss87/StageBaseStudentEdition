

export const activeLink = ( href: string, pathname: string, callbackUrl: string )  => {
  const isActive =
    pathname === href ||
    (pathname.includes(href) && href.length > 1) ||
    (callbackUrl.includes(href) && href.length > 1);
  return isActive;
};
