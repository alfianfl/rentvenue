import React, {useReducer, useState, useEffect} from "react";
import VendorLayout from "../../../../components/Layout/VendorLayout";
import Link from "next/link";
import { PhotographIcon, PencilAltIcon } from "@heroicons/react/solid";
import { editVenueAPI, getDetailVenueAPI } from "../../../../services/VenueApi";
import { useRouter } from "next/router";
import swal from "sweetalert";
function editVenue() {

  const [loading, setLoading] = useState(false);
  const [venueById, setVenueById] = useState({});
  const [image, setImage] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const router = useRouter();

  const {id} = router.query;
  const [venue, setVenue] = useState({
    name: venueById.name || "",
    description: "",
    address:"",
    capacity: "",
    price: "",
  });

  useEffect(() => {
    setVenue(venueById);
  }, [venueById])

  useEffect(() => {
    getDetailVenueAPI(id)
      .then(res=>{
        console.log(res.data.data);
        setVenueById(res.data.data);
      })
      .catch(err=>{
        console.log(err);
      })
  }, [])

  const handleChangeImage = (e) => {
    setImageFile([ ...imageFile, ...e.target.files]);
    if (e.target.files.length < 6 && image.length < 5) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setImage((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    } else {
      alert("File maksimal 5");
    }
  };

    // render photoimage
    const renderPhotos = (source) => {
      return source.map((photo) => {
        return (
          <img
            src={photo}
            alt="image"
            className="h-full w-full mb-20 cursor-pointer"
            key={photo}
          />
        );
      });
    };



  const editVenueHandler = () => {

    setLoading(true);
    const data = new FormData();

    Object.keys(venue).map(key => {
      venue[key] === "" ? null : data.append(key, venue[key]);
    })

    for (const key of Object.keys(imageFile)) {
      data.append('venue_photos', imageFile[key])
    }

    editVenueAPI(id, data)
      .then(res=>{
        console.log(res);
        if(res.data.message === "Max photo reached (5)"){
          setImageFile([]);
          setImage([]);
          swal(res.data.message);
        }else{
          swal("Poof! Your venue has been updated!", {
            icon: "success",
          });
          router.push(
            {
              pathname: '/vendor/venue'
            }
          )
        }
      })
      .catch(err => {
        setLoading(false);
        alert(err)
        console.log(err);
      });
  }
  return (
    <div className="detail-venue">
      <h1 className="text-4xl font-bold mb-10">Edit Venue</h1>
      <div className="mb-8 w-[full] lg:w-1/3">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="username"
        >
          Nama Gendung
        </label>
        <input
          className="shadow text-sm appearance-none border border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="nama gedung"
          type="text"
          value={venue.name}
          onChange={(e) =>
            setVenue({
              ...venue,
              name: e.target.value
            })
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {renderPhotos(image)}
        </div>
        <div className="button-image-profile w-1/3 mb-8">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Tambahkan foto (Maksimal 5 foto)
          </label>
          <label htmlFor="upload-button1" className="flex">
            <div className="bg-transparent flex justify-between align-center text-blue-700 font-semibold cursor-pointer  py-1 px-4 border border-blue-500  rounded-2xl">
              <div>
                <PhotographIcon className="h-7 bg-blue-800 text-white rounded-full p-1 cursor-pointer mr-10" />
              </div>
              <div className="text-center m-auto" style={{ fontSize: "14px" }}>
                {" "}
                Tambah Gambar{" "}
              </div>
            </div>
            <span
              className="font-light ml-3"
              style={{ fontSize: "16px" }}
            ></span>
          </label>
          <input
            type="file"
            name="ktp"
            id="upload-button1"
            hidden
            multiple
            value={venue.venue_photos}
            onChange={handleChangeImage}
          />
        </div>

      <div className="deskripsi-venue">
        <div className="mb-8 w-[full] lg:w-1/3 mt-10">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Alamat Lengkap
          </label>
          <input
            className="shadow text-sm appearance-none border border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="alamat"
            type="text"
            value={venue.address}
            onChange={(e) =>
              setVenue({
                ...venue,
                address: e.target.value
              })
            }
          />
        </div>
        <div className="flex flex-wrap mb-8 ">
          <div className="w-full md:w-1/2  mb-6 md:mb-0">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Kapasitas
            </label>
            <input
              className="shadow text-sm appearance-none border border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="grid-first-name"
              type="number"
              placeholder="0"
              value={venue.capacity}
              onChange={(e) =>
                setVenue({
                  ...venue,
                  capacity: e.target.value
                })
              }
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Harga Sewa
            </label>
            <input
              className="shadow text-sm appearance-none border border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="grid-last-name"
              type="number"
              placeholder="Rp"
              value={venue.price}
              onChange={(e) =>
                setVenue({
                  ...venue,
                  price: e.target.value
                })
              }
            />
          </div>
        </div>
        <div className="mb-8 w-[full] lg:w-full">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="username"
          >
            Deskripsi
          </label>
          <textarea
            className="shadow text-sm appearance-none border border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="deskripsi"
            type="textarea"
            value={venue.description}
            onChange={(e) =>
              setVenue({
                ...venue,
                description: e.target.value
              })
            }
          />
        </div>
            <button
              className="bg-blue-500 font-xs hover:bg-blue-700 text-white rounded-2xl  py-2 px-3 justify-around flex focus:outline-none focus:shadow-outline"
              type="button"
              style={{ fontSize: "16px" }}
              onClick={editVenueHandler}
            >
              <PencilAltIcon className="h-7 bg-blue-800 text-white rounded-full p-1 cursor-pointer mr-3" />{" "}
              Simpan
            </button>
        </div>
      </div>
  );
}

editVenue.Layout = VendorLayout;
export default editVenue;
