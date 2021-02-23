import fetchApi from "../services/marvel";
import { _CHARACTER, _SERIES, _BOOK } from "..//utility/sources/itemTypes";
// fetch by name
export const fetchIdByName = async (name) => {
  const endPoint = `characters?name=${name}`;
  const response = await fetchApi(endPoint);
  const json = await response.json();
  return json;
};

export const fetchComicsByName = async (name) => {
  const doc = await fetchIdByName(name);
  const id = doc.data.results[0].id;
  const comics = await fetchComicsByCharacterId(id);
  return comics;
};

export const fetchSeriesByName = async (name) => {
  const endPoint = `series?title=${name}`;
  const response = await fetchApi(endPoint);
  const json = await response.json();
  return json;
};

// fetch by SeriesId

export const fetchSeriesBySeriesID = async (id) => {
  const endPoint = `series/${id}?`;
  const response = await fetchApi(endPoint);
  const json = await response.json();
  return json;
};
// fetch by ComicsId

export const fetchComicsByComicsId = async (id) => {
  const endPoint = `comics/${id}?`;
  const response = await fetchApi(endPoint);
  const json = await response.json();
  return json;
};

// fetch by CharacterId
export const fetchSeriesByCharacterId = async (id) => {
  const endPoint = `characters/${id}/series?limit=10`;
  const response = await fetchApi(endPoint);
  const json = await response.json();
  return json;
};

export const fetchComicsByCharacterId = async (id) => {
  const endPoint = `characters/${id}/comics?`;
  const response = await fetchApi(endPoint);
  const json = await response.json();
  return json;
};

export const fetchCharacterByCharacterId = async (id) => {
  const endPoint = `characters/${id}?`;
  const response = await fetchApi(endPoint);
  const json = await response.json();
  return json;
};

// fetch by Start Name

export const fetchSeriesByStartName = async (name, offset, sort, filter) => {
  let orderBy = "";
  let contains = "";
  if (sort.length !== 0) {
    orderBy = `&orderBy=${sort}`;
  }
  if (filter.length !== 0) {
    contains = `&&contains=${filter}`;
  }
  const endPoint = `series?titleStartsWith=${name}${contains}${orderBy}&limit=9&offset=${offset}`;
  const response = await fetchApi(endPoint);
  const json = await response.json();
  return json;
};

export const fetchWithStartName = async (name, sort) => {
  let orderBy = "";
  if (sort.length !== 0) {
    orderBy = `&orderBy=${sort}`;
  }
  const endPoint = `characters?nameStartsWith=${name}${orderBy}&limit=100`;
  const response = await fetchApi(endPoint);
  const json = await response.json();
  return json;
};

export const fetchComicsWithStartName = async (name, sort) => {
  let orderBy = "";
  if (sort.length !== 0) {
    orderBy = `&orderBy=${sort}`;
  }
  const endPoint = `comics?titleStartsWith=${name}${orderBy}`;
  const response = await fetchApi(endPoint);
  const json = await response.json();
  return json;
};

export const fetchAllProducts = async (type, offSet) => {
  let endPoint = "";
  switch (type) {
    case _CHARACTER:
      endPoint = "characters?limit=20&offset=" + offSet;
      break;
    case _BOOK:
      endPoint = "comics?limit=20&offset=" + offSet;
      break;
    case _SERIES:
      endPoint = `series?limit=20&offset=${offSet}`;
      break;
    default:
      console.log("Default");
  }
  const response = await fetchApi(endPoint);
  const json = await response.json();
  return json;
};
