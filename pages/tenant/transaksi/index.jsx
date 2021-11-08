import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Link from "next/link";
import Cookies from "js-cookie";
import moment from "moment";
import {
  getPendingTransactionAPI,
  getSuccessTransactionAPI,
  getFinishedTransactionAPI,
  feedbackAPI
} from "../../../services/TransactionAPI";
import { ModalShowCheckin } from "../../../components/Modal";

import swal from "sweetalert";

function transaksi() {
  const userId = Cookies.get("userId");
  const [transaksi, setTransaksi] = useState([]);
  const [transaksiFinish, setTransaksiFinish] = useState([]);
  const [transaksiSuccess, setTransaksiSuccess] = useState([]);
  const [modalCheck, setModalCheck] = useState(false);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const cancelButtonRef = useRef(null);
  const [ulasan, setUlasan] = useState("");
  const [rating, setRating] = useState(0)

  useEffect(() => {
    getPendingTransactionAPI(userId)
      .then((res) => {
        console.log(res.data.data);
        setTransaksi(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getSuccessTransactionAPI(userId)
      .then((res) => {
        console.log(res.data.data);
        setTransaksiSuccess(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getFinishedTransactionAPI(userId)
      .then((res) => {
        console.log("finish" + res.data);
        setTransaksiFinish(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitHandler = (id) => {

    const payload = {
      feedback_content : ulasan,
      rating: rating
    }

    feedbackAPI(id, payload)
      .then(res=>{
        console.log(res);
        if(res.data.message){
          swal(res.data.message)
        }else{
          swal("Feedback berhasil dikirim")
        }
      })
      .catch(err=>{
        console.log(err);
      })

  }

  return (
    <div className="px-10 mb-20">
      <h1 className="font-bold mt-16 text-2xl">Menunggu Pembayaran</h1>
      {transaksi.map((t) => (
        <div className="relative grid grid-cols-5 gap-4 max-w-sm min-w-[700px] bg-white shadow-2xl rounded-3xl p-8 mx-1 mb-10 cursor-pointer ">
          <div className="overflow-x-hidden col-span-2 rounded-2xl relative">
            <img
              className="rounded-2xl w-full object-cover"
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBQTFBcUERQXFxcYGSEZGBoXGBkaGBkZGRoaGhkZGRoaICwjGxwoIBwYJTUkKC0vMjIyGiI4PzgwPC0xMi8BCwsLDw4PHRERHDMoIikxMTEzMTExMTExMzExMTExMTExMTExMTMxMTExMTExMTEzMTExMTExMTExMTExMTEzMf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xABHEAACAQMCAwUFBQcBBAkFAAABAhEAAyESMQQiQQUTMlFhQnGBkbEGI1Kh8BQzYnLB0eHxQ4KSohUkNFODssLS4hZjc7PD/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAQBAgMFBv/EADERAAIBAgQDBgUEAwAAAAAAAAABAgMRBBIhMUFh8CIyUYGhsQUTcZHxQsHR4RUjUv/aAAwDAQACEQMRAD8A2KSaR3ABLEADJJwAKxOP7YbUbdhZdclWlWZIkm2Tt09d8Deuw3YQNPieOt251NlYLAZIDGAWjYb59DWPxHGu55iVgTCZIwYuIQOZMwQc/Q5XDXsh9eNlvMMoYzbuqdx6n/NWyNwFK6eZkBlrewNxD7Vszlf9KzlK5ZIVsYMbEggalgzlB7Vpuo6fKiSPeCBvsfZz1/hufA0yfLJ8Q0Rneblr+HPMn6Ihjy2kECVKk5KjraPtLuPrUkcD5f2iDJ/lg7/hORikn9bf6b7bZnwnClpx1x1/4ebr/C3XY01fyj3dc77QTn8JweU0XAefP9fr9ZjmR01CPz9f1+syUyMf0jGBt8hHTA/CQhbr8v7/AF/M4jlAL3ZPHFT3Vw/yn+nu8vl5Vslq5S+moQMEbf1B9Cf0Njrdldod4ND+NfPcx/X/AFrSEuDKyXFGpNJNNmia2K3FmiabNJNBA4mkmmzSE0APJppNNmmk0AOJommzRNSAs0TTZpJoAdNE02aJqQHTRNMmlmgB00TTZpaAFomkmigkjv6jAXYZMnByDgeeN/fWFxt3S3OT5wd5xBI+HrsN66Ksnt5UAGr8pk+efOuF8SwsI9vi2NUZt6GeOIVs92M++iou9s/gPy/zSVyfl82bXLvF9oPfBYAMgGm5ZYAOJ6oDu0dTvmIqnqXQJJe0CSjD97ZbbnMTp/RmnXXJcC63dXhhLw/duB7Mbe9T8+lCgs0Ad3eIyh1aL4887fUdcV6i/iJjwzawSVFxsa4+6vrGFiID/rIwLEwIGoBT/wCJaM/81v08vyoKRzKqEqP3toxqtGfFaz8cY921X9fgcNI9i71Mt4Lw8sdfyOahghQu4Ak+MhesCe9tGceq0obyMzzSuNUTNxPwuOqdfpGR0CkEczINwRvctNjHmv6LtWrYhix1YMLdiedc8l0eXWPlACagdtt8DBB3Kjcg9U3G4pyttvMgCDJ2xk7+QbZvCaYDPrPppZmEZEjlvemxj5M1R6jMQMHoxC+Xmm85GaAJiBny6x0jGJ+WdjynEGkD+f6H16e/Hn4mrjHlHUGSRAEnBnIDbMJBzTGIOPPO3wj6D5A5CmgB4ac/qPL6fMbzzNdDOtCdQz+vd+pGyao92/8Ab+vwJ9QHN+vqfj+vcMDb4DjBcWfaG4/qPSrM1Q7MtgKXAgtv8Ov68vjVyaZhdx1M5WvoOmkmkmkmr2KizRNNmiaAHTSTTZpJqQHTSTTZomgBZommzRNADppJptFSA6aWm0UEjppRTaUVADqWkFa/ZPYdy+QfAh9puvnpHtfT1qspqKuy0Yt6IzbdssQqgknYAST7q6Tg/sjrGviREARbWNRjYFvZn0/Kum7M7ItcOORZbqxyx/sPQVG3amh+6vjuyxIttvbu+QDey/8AAc+WquZiKyq6JaDVOnl1ZQs9lcOBAthBJ5dKYyfxZzvnzord1nyWlpT5aN8x89RpQavvrBGBJZrQ2BMbgfMQY2ouCEGtjdsSNN4fvLZG2d4B6jbNJaUPL8KdJx3lpjGs9cDwnpOx9AMll+Zm4caLgnvLLiF2gnOzHzGPdXUERzt4BdYAiO6vrEKDOLsYz8j6ZNWrRccsRcbxKf3d4Z2nY/mPdVK2y57hSV/2lh95jLDoPoffAq3wIU2jGq5aBlt+8swD4eoyQAOnQmoYBIA5dULH/wCS00DAiZT+nnT3JmIBLcxAPJdiTrt55GH9PiG3eWCXz7F0baSByXAep6/0NKbZhk05GXtDzGo67TY23I+hyQkV+brIJiTy6zIhbn4bvk1KBJnJJIA6EsDABPs3RjSdmqNWzuCDjUcLcAPhuY5X6A/6EZ5BJx7MtkgAeC75gAjS/maAFMe8ZOBv5jT+TJ72FCt55nPnM7Z6yOvtAgGCBTTOVaQRAOowZ6Kx6N0V/nSe/wBZxB8yNI69SvXBFADyxIB/P1O3r/fPtDIvl+vy+H5ekNVpz1Pxmdp85/5hGzCrPApquD0z+vj8/fqFC1diHobFpNKgeQp802aJpyxiKTSTSTSTUgLNJNJNJNBApNE0ATgb1q8N2KzAm63d4JA3OBPN5YnG+DVJVIxV5MvGEpbGTRUnE2TbYqfgehB2IqKrppq6Ku60FpJpJpakgJooooJFpRSCloAWlFIKWgkUVv8AYf2s7pxZ4vNsxoc5Kej+ajz3Hu25+qvaVqUnqufh1/p8qxrUlONmXpycWe0o4IBBBByCMgg7EVHxVhLiMl1QyMIIYAg/CvJvsl9sH4Ui1dl7UwR7Vv8AiSfZ66fl6+r8JxaXUV7bB1YSrDY/2PpXJnBwHIyTMb/oW8vLa410QeFXRHYDyLuNTfHMUVux6miqXLHz2XW7cAebPFKcNICwPL8YI6H6VHecMVW+vd3R+7uptcJO+o9PQ+fwou3l0i3xqYzouqMOfPUfCevkesDcvo9sFOIHe2iB94OYoD0bz/m32OcCuj1+RPr8CXwdem8e7ujC3V8LQPD7/wCE/DerfC8QVfnAt3txj7m7CwoYA8xE+E5+FU9BVJjvrBBj2mtj8RA3A+Y9Kfw7BVgze4czH40MbnEkD5j5UMEadu2HJCAJcJM23IAuEwXuyAdKgfrBqs1uE1AMUGRMi7a8W05IMfKm3MKCxNy2ZC3FnWCCsKYyQCBnfHuqxb4phzO3MZKXgOVzoZV7yPZUEkDafdFVLATqJBK623P+zveIwd9NwbCBv8qrM0ScjTy8wlk8kufiXczVq9w06xbTJ8VrThhLaCmcMxzEkgeeDULmYkk6TpW4Vz4o0XR1UsCNXp8aAGLt5aQZnOhcCD+O0ce4t6UjjMEwYEyZAHST1X8L9IFMKlTEEMMwJlAc60PtIdyPIVIrTtA6gDMDq1sdV2lPfQQJucjqZEfMEDrvIGDgjNanZSYLHc9d59Z6zjPX3zWQTnMQRjJK6RtB6rtndSK6Dh00qB16+85O1bUleVyk3ZExpKJpDTRkE0lFJQAs1e4Lsx7kE8iH2j1/lHXY+mN6rcLHeJO2tZ90ium469hhHTykyqO4gbnIED5Uria0qdlHibUqanqx9rs9baHQoD6NIaBqkgDMR1ZtiPCM1Fb4oalIG5DGd9LFS0YEYveXSDWmx3+P564+q1glDJUGJJXBk73LQknqJs9MRmd65eZyd2PWS2G9p8KXU450J+KgmdvgRWBNdSt7Uy3BtcRXkDqRByDByKxe1eF0PqXwvkeh6in8JW/Q/IVr0/1Io0UUCugKigUtFFQSLRRSigBaKKKCQpWEiDSUUActx1oo5/W39xHyrY+zH2nucG/LzITz2yeVv4l/C3r85pvbPClhqUbb/D9RWAy5/X6/0pOpBapm8ZcT3ThftXwjord/bSROlzDj0YdDRXjf7K/40/4v8Ulc/NQ/6Rvml4EFziLlsaOKTvEKwHiSgJ9sD67mNzTbKvbGqwe9sz+7JyT10Y/I+W3WmJduWQymbtrGoxzqPL1Gwz0PSnWuHDfecE4DGS1v2QPUHwnb+mATTqd9v7F2rdaf0NsZ1XOFaP8AvLTYUmfDp3B6fKpLZDszWD3V0SbtpxCn0A6n+IefSRUCslxhE2b6xp82PnOzDf3wd5FHEXA0JxC6LgPJdXAZp31dPdt7sUAXE5mPdDu7kS9tiNLAESQOpPmPShBqLC2nq9lj78J/f+tNukqFW+OsreXGZG8HEfL6054wt8/yXl6eKWaPrsc1BII+Cyyyg/8AiWmzzL7pxHwq0/E6iNZXURAuAcrABoW4B+EE+Usc+tO6zBwbhCOIC3ABpbaFbp6n408rqJCKFuNvbPguDGUPmTJzkR1oAc6ATpEEE8mdSQJm2faWNKx5sRUZEeRMwIkBiJlk/C+Gx1+io+MatK7H/a2iTv8AxJ4jH+lBJEbGRqBnkuZEFT7LwFEeh+ABNwa67gGIBnAIEjcx7LbgjYya3qzOx1kM3XwzsTH4h5jGfX56VN0Y2jcxqPUKKKStSgUk0GipIH2WhlPkR9a6LiG+8YebhT8TYWJ/3zgfCuaBrqeJXnZtolp64AYxPT7rIHlXOxu8fMbw3EvcM8ojHqqt1/DbPXPstvWbxNk63AyZ5ZkidIK4jMPZG0kTuNhf4MfdqCCIlIIjZrlvaT5r1PSqXaDaX1iJKqxjci26XCPOIe5065Occ5DgXfCCADDkSYkLcHeL9Y+FLxFgXEKnrsfI9D9ar2EIV7cie7IUT1sOVnf8DJ/c1b4Zwyg+n+R/X/NWUnF3RVpNWZyr2ypKtggwaBWj23ai5q/EPzGD+UVnCu5SnngpHNnHLJoWlpKK0IFpRSClqAFooooJCnUUUAEVmX+zk7wNJzkKATsCSTkYFagqtxXEwhCmCdz0GDiRjViub8Uq5KLs7Ph+5rRV5GPxHZ6szNr3M5Dk/GkqZu1dOCiSN5QT8dRn50V5XPU5fYcymWiXeFzb+9tA4U+LaQRG/Ujfzgb0wpau/ecPcNu7BL9N/ZKdR7pHvNPPD8RwxBt/epBhGkuq+4fDb3RTCLHE81sm3dUdIDl53Inm6ZGcnYCvWcvT+GKc/X+UJd4hX+74xNDmNNz2QB+EjYzPp8gKVw9sAXl7y0RAaJdEndh8s749Ipr8Qyfd8WmpJy6iQTAgMOnTaOlPWw9tdXDuLtrBZNQMScKrf0/LNTfXq/mR1yJ+GUoga0e9snGgmWRdXQnY+h/zTUgLPDkOh8VphlcnlEiZ/Kjg1Ry1zh27u4sG5bbAY6hy6Ouev0M0msO8t91eBwR4WaT12I9PSo6/BYdZYQRa509u23iQ8pbTnBxttvFIVXTqWXtiBpOLlowNuuB/T4oIJHeTbu+w48LbQPST5+XwoZeYLc+7uDAceB4MwfeQBnyoAexwrs2N1ur89NwfIZ88jrUg/CVUFslNrdwAeO23st4vy36QDUGIwlxtxH3d0Y/OfpVjhkDsLYECea2+65yyN5Y/PpQld2A2uCQrbUGZicxOcwY6jb4VNTqSK6CVlYXbuxKSnGkqSBKKKKCBCK6LjrhJKrube435rfExsZGYzK7+KufrobrZtkmARbHxLKv/APTpmufjto+Y3huJd4MwrYiHdto3Zbv4Vnc+fXJMkxdpLhATALG2ZIGG7y11IEy6dGPSMkiLsdgVI89BIMaueyE5h4plfazjyipu0nPduwmQNQjV+FbnsAscocAEnbrXMHCnwZhldtyUJif9ogtXAZzGpAchfdT+G5CyfhJHnsZ6sT8zPuqtxBMlEIz3gEAkg8t60Au0xO7DpjJia/c+8Dg4uIHAld+sCJ67kn4dZZCE7Ut6rZP4cj3dfyzWFXS4ODscVzt23pYqehiungp3i4+AniY2akMopYpYp8WAUtEUsVBIlOoFLQSFFLTbz6FLkEgCqykopyeyBK46BBJyB0G/wrJ7Q4m4twwFAwYAM6d4K7TBnFXOIvzb1WzKmCIJBYe/br1qiOGGqHDiOsyWB9nBI3ryfxHGRrVbJ3ivcdpU8sddyJ+HsMdTTJ3gnfr1opbrpO3QeJZOw3IGaK52f6mxkta4nhZCHvU0iRksi5wDuOsRPUwKax4fisp93cwFAw0jqYwQP6dCaRrnEcPqV/vbWC5zqiNiTnYDBnEZE0Lbs8VJU6bhOIwygdT0Pv8AUeU17Dl6P9mJc/VA1+5YBW+veW5PMN566p36z8d6S1wuO84S4NxKHwsx6aTtj9CKBxF+yBrHe2xIUjcdNUdcDr065pV4a3cPecI5t3AQAo3JjJZeg39DHWaOufkw65eYxXS4wW6ptXQYB2JackMN/d74q2zBR3fErqSYF1ROnJksBnyEiqp4oGE4pAPZVwJXfLTvJ/tsKtcMr2hqVe9tGJBPMFnEHO/lHmMVD6/snr8MQhlXmHfWY33ZZHLn2oGYpAAqSkXbTTynLJ4oAJ+ek+XxoVVOeFeCQNdppA1EGeXoAMSKVQlx5t/c3Rsp8LZMQTgiM9DQAzB8M3bQxB8aZMRPlkxNavYi6pYtrAwpPjE7qSc+W9Zd0yRrBtXT7QHI4IMdfL2T510vZ1orbGpQGOWjadp+QFaUleX0KzehPFa3YfZQva2uatCgDlwSzbZg7CTt5VmRXdcHwv7PZt2yssZd95DGNoU7DHwq+JquEbLdkUoZnqc32p2VatoptXGZi2kg6Dt/KcHYZqv2h2FfskymsD2rYLAe/Eit7iezrl3iEuwO7GkQWBYAMCxjbrAzPpWj2kcXbgg6Q0kMJGlYjYkbbSOtLQxM4tK9zV0ou/A89iinRRFdMUGxWtxDx3RBz3YaATqIt3OGY4XmIiZzpzkEGs23bZiFUEk7ACSfhWxx3DFUVGIIFtg2SQT3eoQow3gPX61z8c1ZDWFWrHdivBKjZVUCJ0ju791CAFHdrgbKZ/EBidG4mCvoB12DlTkbYas2wjC6YBKlbssSZDMUuooAhYhn6TyjJzWrcEzHXUB/vKG+orljhhcG0orLzHSj4UoCbTGzcMEliAmYaTEZxT+JICDS4i1da2YPLBJ0KQoOQGGMR5iq960WJSDpZrqQw7u1F1BcQhFM3YYRrUgzrx5T8Me8tuAT97aW4GQlJYDSxVhmcTO+RVgLCmP15VndqW4YMPaH5j9CrXC3ldRDKQYKlSGB6GCMEeoo4xNSHzXPy3/rTGGqZKi+xlWjmgzJAp6ISYAJPpSRXScPZCIGgqoAY9CZ04855jkCOUia6VatkWwnTp5mYl/gntrqeBJiAZMmImMDcdeo8xVeK64WFa3qzygddMYxpMkCTIB3AYicRWZ2x2UEGu2QR1AHrgiMYBX61jSxWZ2kaVKNleJixRFOiiKcMBAtN4hAEbUJxEHrnb6/Kn6cgxJE6Z8z/Tes+5dKFjcfHRJ90k9Cfd1NcX4njJ006eXfiMUoJ6lNe0iynuwVZjgnkAgdGOwj6VX/AOkWUA3GIJJGBMKD4gN4Oen1qr2heXmW1AaIJLMG2E422gfA1lLcYy25BA+Hr6VwYUYyV7DVzba/OVtFgfaOSfMnHnRVHRcP/eL6cw+O3Xf40UfLj4+oDDx96zyX01IG5nUSScEAnbeDGD9KmbhLHFQbTAOeYlcFQNtS+cx+ZnpTeH7bCxb4m2V0zMCdTT7QPrJ6591Ofsm1dAew4RoLMyHkUZx6eXTY16larTXk9xN6b6cyE3OIsDnXvUI5XHiVepjpgjf0zQOGs34aw+i50C4IA3LD+3mPWn/t3EWf+0IXVgOdfEF+nXrBzvTv2Th+JOqywR5J5cFVAiWX1PUefpRvp6PcOfqiNeJe2AnEoGttH3iieQHEj1+dXbHClR3nB3AyYZrZMp4iFUj8VUv2m9aM8QpuoQCWHi0jaR5eh9c1Pat2203OGu6LhgkDYEsYUqdgM5Ij86Hr1qSuvAVmt3TDzYvDE7AmG1HVgHyikcaT3fFpIJEXAJI1aTzAZmPLzqS5xKmLfGW9McveKCQQNWo+ckwP7UHhrluHQi9a2jVMAgEhW2IAqOvyHX4HWeFdioJ7608KGmSBC7nrAwa6lUgQNhWF9n7NtrjXLWpYHMhkAM3p7hXQxTVFWjcynvY0fs5woucRbBEhTrP+6JH56a6jtO5quacGABBgnznTJ8/wH31m/Yrh+a5cPQBB8TJ+i/OrbXO8uGDILbAz16gMenmg99JYmV6n0QxSVo/U00OkCegX6yfyFczxN2bBZzLFJMxq5wB7RLDfoFrb7UuabV1hvpcj3i3oH/MRWD2m+m0UyNsGRsR7J0np+D4+eNFXmvqi9TY56KIp0Vs/Z7s4XG7x/Ch2823z6Df/AENdapUUI5mJwi5OyND7Odl93FxxztEDyBO3vP661jB27uwFIEoF8JZv3N2NA2mY8WCJHWuzRuZfLUv1rjE/d2B/GimW0iOZcj29/D8elcWrUdSWZnRhFRjZBwtybttmAkMFBgu2m5YViNQxaBZNjM6V8xW3abCn0T/2muY4NyBbLHAFg6pNq0TL2jonNw5HI2ZKeQrpE2I/nHyaRWRdGH2gmi64UoGi3dwpe4e6ud2xKtyqughQy5y3xcjBLqFtI+9e0SxLOy3RrQBhgDBMNnbPnb7Xtl3VPvStwPbYIBp57chnfdMgqDtL+6sxtZBOoKDatuNPM2q0xDhiTpIKgDB8/jKIY6zys6GeVyPAEGcgLGGAnxDrPWrytO/xqDjU+8NwaodQfFyLGcLGCZMnrA8qW23WrAUXSCR5VvcAe8tG3t4YwQBMlcxDHWrCNxqHpOVxaZB8/wBfr3VN2VeKXBAkMCpiMmC6CMZJVozmYxAno1ZZ6UZCcFkm4m3wFxwHUrDASAdUalMjbeY6dPOraNABkMAMbHZgIkb5Rp2ORiaopCyGyFaIGQQhjrEmLQMHmEjmOKeeJUKZZiJ8XWNKDVPWC0wYIjYxSLaWowYXa3DraeJwfmCScQNhj1qqFpv2h++Gq3dsqUQg6nMkglscuDmIxXN8L2izW4aSdXKAJz7sE/rzrL/J1ad1ZNcNfcylRi3dHR3HCAksPKsjjXtypmZMgGNJ321ZjJ/zWZZ7RY3IvAxkABuvQwc/niKk4++AyvpVo6GQR6DPu2rl4rEVa9ROf2WxrCEYrQP2S08uzGCfZxq3MEnfoPSrNi3aSdDCRmCNQBEjEg5n6VWXj7bD7w6IJMICGAABAn1326edN723OE5tgQBq2mWBH6+i9pcblyK5xl5iSLQM9YUz8Sc0UojqG+LKPy04pa1yLwXXmVIrPaHDXxpuCAowr7sx8jsfTMkmq17sYoZ4e4VMSwJ5R5Ceo33narXE9n8NdUukBQI1Icsx2EdTsJPU+lUf2LibAPdPrWNTL0geYPTHQ9K9U7/qV+aE01wduTJP+mLicvE241RLgZ0+UbeexB5jUj8BY4jnssFYySUxpUD2l6E48tz5VFw/bCMSnEIULEapBK6fKIkf/ImaW52XbufeWH0SSQVPKFGPh0x6nyo3219ydt9PYH4jiLWLy94mGLKOfT7Or6wfXNWOA4Szfm5bupaZIYmdLAlsYMYBjIqPg+Pv2WD8RbN22CHZl8UDwz0GQN42OauLa4bjbgNohLmCYARi7ekywBIyBt1xWU5209y8Vx9heMvXLChOJtrdV+VbqkatKNLcu3XfGD1qnw6Y18NcAkcyGdEldTAg5AgDy99M7W75Li27ztdt2j3YYAAlQ3PHQkZEmdhmKrcKiXnAtTbdsR75HyiMGs1J3L5VY7fshG7vW6BHclmA95j8qvRTkthQANgI+VOC+VdOOisKPVnXdgr3fCa9i2p+n8q7kDoOo3pvBWyXXVMDOQ8fAtqHycVb44C3YW3MABUmY8I89LAbdRFUuC9thHhwR3ZmfI2z5xuorkTd25DiVrIb22/3MASWNsRBMi5dUtgK08qt7JrD7QcaAqkeIYBWBg+ypAHxRTWr9oHE2kxHejfR4UtMfbZQeZx1msvtQmFBnrvr9NgzMI/lMVfDK80FXusy4rpvs3i0385/8q1zsV0nYIi1/vH6AU7i3/rMKC7RpoeZfePrXIXLgS2hPS7GF1Z78IMdN9+ma60HIrkeKQm3cUa5F254DDct8tEicQuR1EiuUx5FG9pRWLkK4Qybo725ptcRIJTcnnw0YLAziumttzH+b8mT+9c3ctaC2g92P+sz3Y13ZaLmq2ciZ1HQSMkCMY3OGuSqtnKI2cHG8+tVZKI+1EJRGVGcoyMFV9HhYqWboyqrFtJ30ish7mm4itcRQL9yyVtgkkXV1WgXJLW2CiYmJO20bXanDi5auW2t94CGHd6iuuRqC6h4ZMZ6VkuHm6WCJqtW7ulc3NactzWQc7BQcbe+hAxo1Hh7TC0xe23dkXGCuqg6SxJwTpkx1qa3TkIY37egkELcGrCtrEnSR03FV+GLQNaFGK5UkHSfw6uvvqQRZcSp+f6/Oqzg6TpEsOZPMMhDjBEHKjBx7yAKso1IghhmM7+nX128s+VPYeWaEoeYtVVpKRfXiLbW1uOyKLiadwVyq4gQSo1PhirL7t6lzte1rPfamERzMCDNxnClJAMcukxqEelN7M4ZFD276DSh184WO6PekG4AMw+qCMzB2MVj9sXbfCsbaOxZXZXlJADARMnJkka8YxFcvEuce69DVMz+2L1tXB0AWyoyCDJAELmfIAmc586x1slCQHVi2yWwDJMxI9kj/NaF12adtIXVnTucKY3MsZx5msrg7Ba9pDAEAtq6YiCPj086RTbV2Bds2LhQalSGxLCCIieZsz6iaLl20jaAmo4BII5Y6jy99S3eKVIkqxkAcnNq9B0zBiOs9aa3EW1YnTDKIDsNWTMwBiRn4/GstXq19iTO7Q0lj3ZgjIONoznYR54qvw926CSqnA5pZRqUeROY93lVjje1JcLgoMQFAGIyJPnNVgdZOlhLAEgA5O+0AesiBnem6MG42aIY/TdbM7+VFHfRhlUHr4//AE4+VFaZOaIuyfifs8ULPYuEaPxYJO8Ajfp03MVA3aPE2uS+krILEQCR0llwRyjB8qcvF8ZYEOveIjSZGoTvlhnrPN1g1Pw3b1p5F3UpY8xOVjooPlgDIGJrtq19HZi2ttdRx43h+IhSBqYjx4KqJwp2k+h6mobvYRWGsXCpYE6ScaRtJ6zIwQd/SrLdk2eI5kAXWSRoOAo8xsZx6y3pVa32ZxSH7h+8VgYUndF9GMBTPQjxCpl4tX5ohNbJ25MtcN2te4YRxNltLaX7xQDygcmJAicxKnBplrh+FvW7l0MFdRqAUhG1Ewo0gbapzvBGcUcT9pTcm3xFvQSV1YJGkARykyB1jmnUdqrdt2eFK2zY06iCzaDgSYVCOhGc74HnS0pNmyViNeNuoIb7xcLLb4bUQG+szvWv9lbFu7e7wKQbY1EEY1NqUflt1rnHW4oUEyBJE+bROflvXffZLhwLPeBSveMTnfSpIX+taUY3kiKjsjairfZFjXetjpqk+5eb+lV4ra+zNn7x3/CsfFj/AGB+dOVpZYNmEI3kkaXa9yComIBM/ejf+K2DG3Wo+CIKAg6tTiDqDYBBIDADGDvmoe0X+8JkAiAJN22cdNS8pzPSrNhsIW8i/i1bCPF18VcqXdG1uY/bN7763zaQEuMeYr4nVVzoZdkPiis3ioJGmCCJle7g5I3tAKdt96tcTcI4hizadNq1bPNdTm57h5kBX2xvVfiTLTM4GdQaeviAE/KmMKu35FKvdK2muj7FH3Q95+tYOmui7JH3S/H/AMx/X6kb4t9jzM6C7RZJz+v1+vea5bi15b4gmLt4ADc89xsYPp0NdQ36/L9f4rmeLsLcPFW3Eq1+6jAblXXIB6eKuYx1FFryi4BrVSb2nly03LOoZE6G67r09Ju9jtqs2jz/ALsj70RcxEa/4/P1qmgRZZUUE9y5MSSSRa1Z2IURIjA99WexO8FsC8XLi7cUlxDFS76T7tOmPSKgEap6+ulv71h9kG2Ftqlootu7c4bS5LEKmqBJ8SnSTkHetpJgfykfI1h8S9xO+7iwqxct3dbtK3Q8d84kjQyiR8PWKALPDF5tFiSAr2rmIGsECYGBJD/lVPhOF7tnTSyrrLKSwaZy0DdQD7JqPi7xHfG7xAPdXkugIJZbTgBLdxRAySc5wAam7SdUvJytquggMI0CBPMdwZmKkCcrGPI/6U4iaC2sA9Y/MUIa2oSyzTM6kc0WNv3WtgXFB3ZGg6f3pWNP4SHgyTH3jYAbGVa4lXuE3x3VofvJPUkk6TkEwJj3gbitl7WtWtseW4Ch8gWEKSDtDaDI8vXGXxXZQ4y1buK7C6q91dJMBXtIJ1kgapkcwODAz0wxmHefNvyKU5XRxvGXwGdcyD4nUBpljqUbxB8ugo4O5zs5eXZGJPN1IjSd9RH1j1qbtDsK5bYd+HtajC6gDLKBOVxEes8y71Bw/BWiVC3G7wHODEZ2gyxOOg360lKKSaZck4gIY7tmZpAJfSABM+7eN/LFVnZTJ17+L2RP8Ign4xuat8T2U6kaVYgZeQQQJ3gx9RRfRikuWAXwKwMlfZMauUACIB8ulRSUeLAy71psYIHQmInHnAnIqZrga5LW5EYBcNkDBJM491NvOE5LojTJxvn2TI6VY4dLboQSiKRMrDPtIDAEYnpMimVFy0WxW4ybQw1tyevINzmN+m3worQXi39nu2HQgtn5sKKY+THxZXM/Ai4b7QWn0JcDIAdTEiQzbjK9Jk7DYVPc4WxxEEBWZzJZSJVR0x12HvY1Ne7HsXNIKjUed2TGDOBHrtPRTWTc+zjCHs3CCx5QZB09GLrsIjp1Arodpbq4v2eDsJc7CZDqsXCpYkASQSo6ll6b9OoqS32jxfDqTeta0ZdGvaFU82llwPeR5VXW/wAZa3XWBKAxqjz0lc9OvlV7/wCqbbJpNt7bBQi6CCFE8x1RImBjT7NZVHFKyujWKb31H8B2nwt+4f2gqoY5FxEVepmRifZkmYb0rI7Q4K2zs9g6FklQCSACYUA7yRWxf4fg7nDlkCF5VFKtzA+JiwGfxDm30rXOnhHTNt4Hij0BwfI9KyRf0Jks3QwUjUS0e9mIxPxr1zh+ENtFUKYVQBgxgb15v9nb1w3FW4IFsl5ABOrEGCYJ+VdEloM5KvBMszSqnUTMQtyfPMUzSulm9zKbV7M6eK6XsC3ptFvxMT8Bj+9ecXePZNr7T0Gq8sxvE4/OvSraNb4ZUJYsLYBII1aiMkFusk71WvNuKXiWppXujM73USVbxGfu70GSZPLcEfCtJwYYTPIFB9XJH/trPshy66+9ydrlpCBGfGu3oa0CZPvugf8AAAT+amlJGsTm14le+vnvFUtdIH3ty00W1W15aDlDSXcsSc/GfzG/vqPsp2e3qU3OctcGi7acHvGL/u3GN9qnInNM4XvNmdXZEOmt/s0fdp8fqaxdNbvAj7tPd/U/r/NXxb7C+pFDvDrm369P1HXrXP3zF7iYyf2gkDzlLePzroX2/XWPkPzNc9xP/aOIH/3UP/FbtdK572G0Yd7ibgsyxSwws22YNBKAXR3iEZaIlQY3PvjR7PddV8Lcdyt4M2v2S4VtCk+wAwisTh+Gt6US3aa4Dwr2w1yWDC3clbbquC0knBnpW3wzXC93WyFTbQ21HjUBebWPVpj0qANZT+T/AFrD7W4e09w27rXCb1h7YtqeUhDqZ0kQLnMo+AranxH3NVXtDvA6G0qMBcBuFvEtsqZKHz1BcdaEBjdn3FutbdLEpxHC81x+bmtmLdu4DybMc9fhV/iXJsqxYW9OHLFQMdGIwOtIzlYLXATbukGCWnVsCEwD79qc3C23S7YYFkMggwvKdwCDMR1waAILbbx7x/iplM1S4ZgVGkEAcukmSI2z1NWAdqlANN3xWyTsQu0iVIBHng7fSpeGbVcuoTyXUF0BCsLc1i1fABEOpIGqZ5ZxkzndtIdIdcERkem31NNXigFW4AZtuLw0YLKxC30WCIIOljkZadjTUu3BS8hddmTQ77Z8fbe21u4UW4hcwCWYL4E06sKDpWYypB6zOP2ZcuMVAVhKDu27zCooYDGA6yplDsDsZJPU8T2bbv2wLlwEPbj7pFCm414xdBRvHBJa3sSPSqnCfZ4WWuXNb3LoN1k0oqAjTym0dUKys3lkzAiDScots1OO4riXTN1ys7iAJIJ2beNiDFU7PEG4rgLr9oDErDCWB/LbrPStHjezr/Fsb98JaUBAqls3JKiOXqQ09PEg6gmFLNuzcuOrxAIU22Kkg9DGw6Y9MCqZNLsrsyW5wD2LmlrlzvbceoTCnTkSxhiJiMgjyqstwNkKGY+IXV1W9M5MJpMz1EfE1O/EJKm2oBksSW1yzEE+IkyDJz1Y/Cq7bszEahEAdPP0Hp61WWJ0skCiVtTryqUgbeI/md6KjuBZMmT1Ok5/Oio+bPxJsiBOGvW4FtyNQ2ViMRmRtVhPtFfU/eaWIGkEiCM78uN46dBSUV0VNrYplT3NLhPtNbWCUZSqwoww1HqT8unU1Fcv2LtzVcUkBQBPtGMSBnJgnPU0UUSk5PUqopLQqdp8BZ7wLwxYQAOb8RyY8hEdfOqjG9b3IK7Zz4Tt5xRRULiTwR0v2XN0q1xF06iRqGesHa4hHl12p/Eo0j9o4g3IBjWGBBPXlDeW1LRVk29ynFlrsThxd4q0gZGDOJgAEjds90vScV6x2uQUCkKQTkODBA/l6zB+FFFZybNI7FTguEhwSgX1R2gwcDSaTjbwSyz/AIbVy78dJP8A66KKpLcstjmuzr9ru0UPaYoFSHsQ0wMBl6+u1ammkoprDcTKrwF01s8KORfcPz2+P0ooqcV3UFHdjyMD8vfA29fU1zfFN/1rix5Na/8A1L/akopF7DSM26plVuvlu9UqJOoFZkAALIU9fP31H2bdtd8iqra34YEucAojlVXSCYIJJ+O5ooqAN2wZA/kj5VS+0Nm21hjfZktgK5dcsptsGBAg+UbdaKKhEsz+M462DfAR3b9nHEaSwRWGYCsvMp5czU3Dcdqu2zoULesh5jmJ2hjOQAcY60UUPYqtxLyuGbXkTy7e4jHvO9KD/eiihFxnEQ6FepBj9fGsfgb0LzSVRjrGINu4NFwH3biOvTMgopuhrCX1F6veR0HYsMoslRqS4tp4ZkLadTq6sntgQSTvzD0OmyB+S5pm6jsUQMhbWsatckW3GlgYnwrB8yisZblo7GVd4K3fc3DwyM6LadHe4wL2yhLSokK6lSZETp6nfkftIOGe5cuWrhVnMlNJCsPDiFhTIHp1oorOaQPYx+DBtyWiRICxIGsRqnzBj5VE7mDgHGJmRuaKKTfeLEacK0DaiiijMwP/2Q=="
            />
          </div>
          <div className="mt-4 pl-2 mb-2 col-span-3 flex justify-between ">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-0">
                {t.Venue.name}
              </p>
              <p className="text-xs text-gray-800 mt-0">{t.Venue.address}</p>
              <p className="text-sm text-red-500">IDR {t.total_payment}</p>

              <div className="mt-5">
                <p className="text-sm text-red-500 font-bold mb-3">
                  Pembayaran berakhir pada pukul{" "}
                  {moment(t.expiredAt).format("hh:mm:ss")}
                </p>
                <a
                  href={`https://app.sandbox.midtrans.com/snap/v2/vtweb/${t.token}`}
                >
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1 text-white text-md rounded rounded-2xl">
                    Bayar
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
      <h1 className="font-bold mt-16 text-2xl">Penyewaan Berhasil</h1>
      {!transaksiSuccess.length ? (
        <h1>Belum ada gedung yang disewa...</h1>
      ) : (
        transaksiSuccess.map((t) => (
          <div className="relative grid grid-cols-5 gap-4 max-w-sm min-w-[700px] bg-white shadow-2xl rounded-3xl p-8 mx-1 mb-10 cursor-pointer ">
            <div className="overflow-x-hidden col-span-2 rounded-2xl relative">
              <img
                className="rounded-2xl w-full object-cover"
                src="data:image/jpeg;base64,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"
              />
            </div>
            <div className="mt-4 pl-2 mb-2 col-span-3 flex justify-between ">
              <div>
                <p className="text-lg font-semibold text-gray-900 mb-0">
                  {t.Venue.name}
                </p>
                <p className="text-xs text-gray-800 mt-0">{t.Venue.address}</p>
                <div className="mt-10">
                  <p className="text-xs text-gray-500 font-bold mt-0">
                    {moment(t.start_book).format("D MMM YYYY")} -{" "}
                    {moment(t.finish_book).format("D MMM YYYY")}
                  </p>
                  <div className="mt-2">
                    <button
                      className={`${
                        t.Checkin_Status.checkin_code !== null
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-400"
                      }   px-3 py-1 text-white text-xs rounded rounded-2xl mr-5`}
                      disabled={
                        t.Checkin_Status.checkin_code === null ? true : false
                      }
                      onClick={() => {
                        setOpen(true);
                        setAction("checkin");
                      }}
                    >
                      Check-in
                    </button>
                    <button
                      className={`${
                        t.Checkin_Status.checkin_code === null
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-400"
                      }   px-3 py-1 text-white text-xs rounded rounded-2xl`}
                      disabled={
                        t.Checkin_Status.checkin_code !== null ? true : false
                      }
                      onClick={() => {
                        setOpen(true);
                        setAction("checkout");
                      }}
                    >
                      Check-out
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Transition.Root show={open} as={Fragment}>
              <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={setOpen}
              >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <div className="mt-2">
                              <p className="text-md text-center text-gray-500">
                                Gunakan dan Berikan kode untuk{" "}
                                {action === "checkin" ? (
                                  <span>Check-in</span>
                                ) : (
                                  <span>Check-out</span>
                                )}{" "}
                                kepada Vendor
                              </p>
                              <h1 className="font-2xl font-bold mt-5">
                                {" "}
                                {action === "checkin" ? (
                                  <span> {t.Checkin_Status.checkin_code}</span>
                                ) : (
                                  <span> {t.Checkin_Status.checkout_code}</span>
                                )}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>
          </div>
        ))
      )}
      <h1 className="font-bold mt-16 text-2xl">Penyewaan Selesai</h1>
      {transaksiFinish.map((t) => (
        <div className="relative grid grid-cols-5 gap-4 max-w-sm min-w-[700px] bg-white shadow-2xl rounded-3xl p-8 mx-1 mb-10 cursor-pointer ">
          <div className="overflow-x-hidden col-span-2 rounded-2xl relative">
            <img
              className="rounded-2xl w-full object-cover"
              src="data:image/jpeg;base64,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"
            />
          </div>
          <div className="mt-4 pl-2 mb-2 col-span-3 flex justify-between ">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-0">
                {t.Venue.name}
              </p>
              <p className="text-xs text-gray-800 mt-0">{t.Venue.address}</p>
              <p className="text-sm text-red-500">IDR {t.total_payment}</p>

              <div className="mt-5">
                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-light mb-2"
                    htmlFor="username"
                  >
                    Berikan Ulasan
                  </label>
                  <input
                    className="shadow appearance-none border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Masukan komentar"
                    onChange={(e) =>
                      setUlasan(e.target.value)
                    }
                  />
                </div>
                <div className="my-4">
                  <label
                    className="block text-gray-700 text-sm font-light mb-2"
                    htmlFor="username"
                  >
                    Masukan rating 1/5
                  </label>
                  <input
                    className="shadow appearance-none border-gray-700 rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="number"
                    placeholder="1 - 5"
                    onChange={(e) =>
                      setRating(e.target.value)
                    }
                  />
                </div>
                <a
                  href="#"
                >
                  <button onClick={() => submitHandler(t.id)} className="bg-blue-600 hover:bg-blue-700 px-4 py-1 text-white text-md rounded rounded-2xl">
                    Kirim
                  </button>
                </a>
                
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default transaksi;
