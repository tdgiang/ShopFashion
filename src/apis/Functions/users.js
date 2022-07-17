import {
  PostLogin,
  PostData,
  GetData,
  PostFormData,
  PutData,
} from "../helpers";

import url from "../url";

export const loginApi = async (body) =>
  PostLogin(url.urllogin, body)
    .then((res) => res)
    .catch((err) => err);

export const SignUpApi = async (body) =>
  PostLogin(url.urlSigup, body)
    .then((res) => res)
    .catch((err) => err);
export const userInfoApi = async (body) =>
  GetData(url.urlUserInfo, body)
    .then((res) => res)
    .catch((err) => err);
export const editCard = async (body) =>
  PutData(url.urlEditCard, body)
    .then((res) => res)
    .catch((err) => err);

export const createBillApi = async (body) =>
  PostLogin(url.urlCreateBill, body)
    .then((res) => res)
    .catch((err) => err);

export const doneBillApi = async (body) =>
  PostLogin(url.urlDoneBill, body)
    .then((res) => res)
    .catch((err) => err);

export const listCollectionApi = async (body) =>
  GetData(url.listCollection, body)
    .then((res) => res)
    .catch((err) => err);
export const listPopularApi = async (body) =>
  GetData(url.listPopular, body)
    .then((res) => res)
    .catch((err) => err);
