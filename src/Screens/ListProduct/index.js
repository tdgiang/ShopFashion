import React, { Component } from "react";

import ListProductView from "./view";

const ListProductData = [
  {
    id: 1,
    type: "Burgers",
    img: "https://cdn.lep.vn//2022/05/images/products/1652781254962-A82A2575-800x800.jpeg",
    name: "Váy Cổ V Ly",
    price: 450000,
    address: "13 Street 47 W 13th St ,NY",
    time: 10,
    km: 2,
    rate: 3.6,
    review: 1000,
    open: "7:00 - 21:00",
  },
  {
    id: 2,
    type: "Burgers",
    img: "https://cdn.lep.vn//2022/06/images/products/1656399176652-MAXIJENN-3-800x800.jpeg",
    price: 500000,
    name: "Váy Maxi Jenn - Đỏ Cam",
  },
  {
    id: 3,
    type: "Burgers",
    img: "https://cdn.lep.vn//2022/03/images/products/1647538267012-IMG_2578-800x800.jpeg",
    name: "Váy nơ cổ tùng xòe",
    price: 600000,
  },
  {
    id: 4,
    type: "Burgers",
    img: "https://cdn.lep.vn//2022/03/images/products/1647527709988-_DSC9545-300x300.jpeg",
    name: "Áo Khoác Lệch Tà",
    price: 1450000,
  },
  {
    id: 5,
    type: "Burgers",
    img: "https://cdn.lep.vn//2022/07/images/products/1656856238386-IMG_5230-800x800.jpeg",
    name: "Váy cổ tròn nhún eo",
    price: 790000,
  },
  {
    id: 6,
    type: "Burgers",
    img: "https://cdn.lep.vn//2022/07/images/products/1657089641385-1VA02018HO-03-800x800.jpeg",
    name: "Váy wrap tùng xoè ",
    price: 595000,
  },
];

const ListProduct = (props) => {
  const { name, products } = props.route.params.data;

  return <ListProductView name={name} data={products} />;
};

export default ListProduct;
