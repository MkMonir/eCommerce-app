import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addProduct, getTotals } from '../redux/cartRedux';

import Breadcrumbs from '../components/Breadcrumbs';
import Counter from '../components/Counter';
import Loader from '../components/Loader';
import { publicRequest } from '../requestMethods';

const CheckMark = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 
        0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 
        312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 
        36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 
        9.997-26.207 9.997-36.204-.001z"
    ></path>
  </svg>
);

export default function Product({ id }) {
  const PF = 'http://localhost:7000/images/';
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [product, setProduct] = useState({});
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('Black');
  const [size, setSize] = useState('L');

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const { desc, categories, ...item } = product;

  const handleAddCart = () => {
    dispatch(addProduct({ ...item, quantity, color, size }));
  };

  if (!product) return <Loader />;

  return (
    <>
      <Breadcrumbs>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <span>{product.title}</span>
      </Breadcrumbs>
      <section>
        <div className="tw-container py-16">
          <Link to="/products" className="btn-sm bg-blue-500 text-white w-max">
            Back to Products
          </Link>
          <div className="grid lg:grid-cols-2 items-center gap-16 mt-6 relative">
            <article id="product-photos" className="flex justify-center">
              <img
                alt={product.name}
                className="main-product-image-sm md:main-product-image-md lg:main-product-image bg-gray-300 rounded object-cover max-w-full shadow-md border border-gray-400"
                src={PF + product.img}
              />
              {/* <div className="mt-4 grid grid-cols-5 gap-4">
                            {
                                images.map((image, i) => (
                                    <img
                                        alt={image.name}
                                        key={image.id}
                                        className={`
                                            bg-gray-300
                                            h-12 md:h-20 w-full object-cover
                                            rounded cursor-pointer 
                                            ${imageIndex === i ? 'border-2 border-blue-500' : ''}
                                        `}
                                        src={image.url}
                                        onClick={() => setImageIndex(i)}
                                    />
                                ))
                            }
                            </div> */}
            </article>
            <article
              id="product-info"
              className="capitalize flex flex-col gap-5 lg:gap-4 text-sm md:text-base"
            >
              <div>
                <h2 className="font-bold">{product.name}</h2>
                {/* <div className="mt-3 flex gap-2 items-center">
                                    <span className="text-base text-yellow-500 flex">
                                    {
                                        Array(5).fill('').map((_, i) => (
                                            <svg key={i} className="w-4 h-4 mr-1" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                {(i + 1) > roundedStarNumber ? emptyStar : filledStar}
                                            </svg>
                                        ))
                                    }
                                    </span>
                                    <p>({reviews} customer reviews)</p>
                                </div> */}
              </div>
              <h4 className="font-bold text-lg lg:text-2xl text-blue-400">
                Price: ${product.price}
              </h4>
              <p className="leading-loose">{product.desc}</p>
              <div className="w-3/5 lg:w-2/5 flex flex-col gap-4">
                <p className="grid grid-cols-2">
                  <span className="font-bold">Available: </span>
                  {product.inStock > 0 ? 'In Stock' : 'Out of Stock'}
                </p>
                <p className="grid grid-cols-2">
                  <span className="font-bold">ProductId :</span>
                  {product._id}
                </p>
              </div>
              <hr className="my-4 md:my-6" />
              {product.inStock > 0 && (
                <>
                  <div
                    id="colors"
                    className="grid grid-cols-2 w-3/5 lg:w-2/5 bg-blue-300 p-2 rounded-lg"
                  >
                    <span className="font-bold ">Colors :</span>
                    <div className="flex gap-2">
                      {product.color.map((color, i) => (
                        <button
                          key={i}
                          style={{ background: color }}
                          className={`
                        w-6 h-6 rounded-full
                        p-1.5 text-white outline-none
                        ${index !== i ? 'opacity-60' : ''}
                        
                    `}
                          value={color}
                          onClick={(e) => {
                            setIndex(i);
                            setColor(e.target.value);
                          }}
                        >
                          {index === i && <CheckMark />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex w-36 gap-2 p-2 text-lg bg-blue-300 rounded-lg">
                    <p className="font-bold">Size:</p>
                    <select
                      onChange={(e) => setSize(e.target.value)}
                      className=" px-2 w-full border-1 border-gray-700"
                    >
                      {product.size?.map((size) => (
                        <option size={size} key={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Counter
                    className="ml-2 my-3 text-5xl lg:text-4xl"
                    count={quantity}
                    setCount={setQuantity}
                  />
                  <button
                    className="btn bg-blue-500 text-white md:w-1/2 lg:w-max"
                    onClick={handleAddCart}
                  >
                    Add To Cart
                  </button>
                </>
              )}
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
