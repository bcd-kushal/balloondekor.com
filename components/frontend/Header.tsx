import HeaderUI from "@/components/cms/header/ui/Header";

import { DOMAIN } from "@/constants/cms/apiRoute";
import { CityDocument } from "@/schemas/cms/city";

import { NavLinkDocument } from "@/schemas/cms/navLink";
import { TrendingDocument } from "@/schemas/cms/trending";
import { SearchResultDataType } from "../cms/searchBar/logic/SearchOnType";
import { toSlug } from "../cms/service/ServiceList";
import { SearchTagsListType } from "../cms/searchBar/utils/types";
import { SettingDocument } from "@/schemas/cms/setting";

async function getSettings() {
  const res = await fetch(
    `${DOMAIN}/api/cms/setting`,
    {
      next: {
        revalidate: 1
      }
    }
  );

  const result = await res.json();

  return result.data;
}

async function getCities() {
  const res = await fetch(
    `${DOMAIN}/api/frontend/city`,
    {
      next: {
        revalidate: 300
      }
    }
  );

  const result = await res.json();

  return result;
}

async function getNavLinks() {
  const res = await fetch(
    `${DOMAIN}/api/cms/nav-link?populate=true&active=true&sortBy=order&orderBy=asc`,
    {
      next: {
        revalidate: 300
      }
    }
  );

  const result = await res.json();

  return result.data;
}

async function getTrendings() {
  const res = await fetch(
    `${DOMAIN}/api/frontend/trending`,
    {
      next: {
        revalidate: 300
      }
    }
  );

  const result = await res.json();

  return result;
}

export async function getServicesForSearch(
  currentCity: CityDocument | undefined
): Promise<SearchResultDataType> {
  const res = await fetch(
    `${DOMAIN}/api/frontend/search`
  );
  const resData = await res.json();

  if (resData.data) {
    const serviceList: {
      name: string;
      category: {
        name: string;
        slug: string;
      };
      img: string;
      price: (string | number)[][];
    }[] = resData.data;

    const searchReadyData: SearchResultDataType =
      serviceList.map((x) => {
        const r = x.price.find((eachPrice) =>
          currentCity
            ? String(
                eachPrice[0]
              ).toLowerCase() ===
              currentCity.name.toLowerCase()
            : []
        );
        return {
          name: x.name,
          category: x.category.name,
          price:
            r && r.length > 2
              ? Number(r[1])
              : Number(x.price[0][1]),
          icon: x.img,
          link: `/services/${toSlug(x.name)}`
        };
      });

    return searchReadyData;
  }

  return [];
}

async function getSearchTags() {
  const res = await fetch(
    `${DOMAIN}/api/frontend/trending`
  );
  const resData = await res.json();
  return resData as SearchTagsListType;
}

export default async function Header() {
  const settings: SettingDocument =
    // {} as SettingDocument;
    await getSettings();
  const cities: CityDocument[] = // [];
    await getCities();
  const navLinks: NavLinkDocument[] = // [];
    await getNavLinks();
  const trendings: TrendingDocument[] = // [];
    await getTrendings();
  const searchTags: SearchTagsListType =
    await getSearchTags();

  return (
    <HeaderUI
      settings={settings}
      cities={cities}
      navLinks={navLinks}
      trendings={trendings}
      searchTags={searchTags}
    />
  );
}
