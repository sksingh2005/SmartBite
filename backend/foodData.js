// foodData.js

const foodItems = [
    {
      id: 1,
      name: 'Cheeseburger',
      CategoryName: 'Fast Food',
      img:'https://media.istockphoto.com/id/1438143625/photo/double-cheese-beef-burger-with-kitchen-background.jpg?s=2048x2048&w=is&k=20&c=TFvLMqQ4RrxkB7DhSM0M9ZBcztfZkV2D5oz5tYZcKQI=',
      options: [{ Small:2, Regular: 5, Large:7 }]
    },
    {
      id: 2,
      name: 'Veg Pizza',
      CategoryName: 'Fast Food',
      img: 'https://media.istockphoto.com/id/842082336/photo/homemade-veggie-pizza-with-mushrooms-peppers.jpg?s=2048x2048&w=is&k=20&c=nUFLz6cJ-tyijdWtpEBey6b8Ur10g44mkxnMJCr1ww0=',
      options: [{ Small:2, Regular: 5, Large:7 }]
    },
    {
      id: 3,
      name: 'Chocolate Cake',
      CategoryName: 'Desserts',
      img: 'https://media.istockphoto.com/id/1370520449/photo/slice-of-chocolate-cake-with-glaze.jpg?s=2048x2048&w=is&k=20&c=BmA5pwJCEwB2v2z8vD3ugYNWYQ9B1kV4LjXKX9lV6es=',
      options: [{ Small:2, Regular: 5, Large:7 }]
    },
    {
      id: 5,
      name: 'IceCream',
      CategoryName: 'Fast Food',
      img: 'https://media.istockphoto.com/id/163858249/vector/soft-serve-ice-cream-cones.jpg?s=2048x2048&w=is&k=20&c=CiWSKye9cVZYA0MmYTR0CubtFTUZgopArK1Za_9FbGo=',
      options: [{ Small:2, Regular: 5, Large:7 }]
    },
    {
      id: 6,
      name: 'Belgian Waffles',
      CategoryName: 'Fast Food',
      img: 'https://media.istockphoto.com/id/911076776/photo/sweet-homemade-berry-belgian-waffle.jpg?s=2048x2048&w=is&k=20&c=_jaF-BX5lCFTgoJBXLu6rO6xI6TOJLgP4Z7FisLV8TA=',
      options: [{ Small:2, Regular: 5, Large:7 }]
    },
    {
      id: 7,
      name: 'Lays',
      CategoryName: 'Fast Food',
      img: 'https://m.media-amazon.com/images/I/512xXdESgxL._SX300_SY300_QL70_FMwebp_.jpg',
      options: [{ Small:2, Regular: 5, Large:7 }]
    },

  ];
  
  const foodCategories = [
    { id: 1, CategoryName: 'Fast Food' },
    { id: 2, CategoryName: 'Desserts' }
  ];
  
  module.exports = { foodItems, foodCategories };
  