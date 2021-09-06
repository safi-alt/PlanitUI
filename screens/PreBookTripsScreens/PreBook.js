import faker from "faker";
import niceColors from "nice-color-palettes";

faker.seed(1);

const colors = [
  ...niceColors[1].slice(1, niceColors[1].length),
  ...niceColors[55].slice(1, 3),
];

const data = [
  {
    image: "https://image.flaticon.com/icons/png/256/435/435041.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435061.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435065.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435050.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435037.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435043.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435055.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435039.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435036.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435064.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435034.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435042.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435032.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435031.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435051.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435060.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435025.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435033.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435069.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435059.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435030.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435046.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435045.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435062.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435066.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435068.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435022.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435056.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435063.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435024.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435027.png",
  },
  {
    image: "https://image.flaticon.com/icons/png/256/435/435052.png",
  },
];

export const detailsIcons = [
  { color: "#9fd7f1", icon: "isv" },
  { color: "#f3b000", icon: "Trophy" },
  { color: "#f2988f", icon: "edit" },
];

export default data.map((item, index) => ({
  ...item,
  key: faker.datatype.uuid(),
  color: colors[index % colors.length],
  name: faker.name.findName(),
  jobTitle: faker.name.jobTitle(),
  categories: [...Array(3).keys()].map(() => {
    return {
      key: faker.datatype.uuid(),
      title: faker.name.jobType(),
      subcats: [...Array(3).keys()].map(faker.name.jobType),
    };
  }),
}));
