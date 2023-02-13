import { useEffect, useState } from "react";
import { GiCrossedSabres } from 'react-icons/gi';
import "./EventDetails.css"

const AdDetails = () => {
    console.log(props.data.info)

    const popUpContent = document.getElementsByClassName("textContent")

    console.log(popUpContent[0])

    useEffect(() => {
        const closePopUp = (e) => {
            if (e.target.id == "background") {
                popUpContent[0].setAttribute("closing", "");

                popUpContent[0].addEventListener(
                    "animationend",
                    () => {
                        popUpContent[0].removeAttribute("closing");
                        props.closeHandler(false)
                    },
                    { once: true }
                );

            }
        }

        document.body.addEventListener("click", closePopUp)

        return () => document.body.removeEventListener("click", closePopUp)

    })

    const onClickHandler = (e) => {

        popUpContent[0].setAttribute("closing", "");

        popUpContent[0].addEventListener(
            "animationend",
            () => {
                popUpContent[0].removeAttribute("closing");
                props.closeHandler(false)
            },
            { once: true }
        );
    }


    return (
        <div>

        </div>
    )

}

export default AdDetails;