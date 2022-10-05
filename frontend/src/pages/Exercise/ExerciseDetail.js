import React, { useEffect, useState} from "react";
import ExerciseDetailInfo from "./components/ExerciseDetailInfo";
import {useParams} from "react-router-dom";
import './Exercise.css';
import {customAxios} from "../../Common/Modules/CustomAxios";
import {EXERCISE_STATE} from "../../Common/Modules/Common";

function ExerciseDetail() {
    const {id} = useParams();
    const [tryCode, setTryCode] = useState("");
    const [exerciseDetail, setExerciseDetail] = useState({});
    const [code, setCode] = useState("");
    const [initCode, setInitCode] = useState("");

    useEffect( () => {
        customAxios.get(`/exercise/${id}`).then((response) =>
        {
            setExerciseDetail({...response.data.data});
            setCode(response.data.data.exerciseContent.code);
            setInitCode(response.data.data.exerciseContent.code);
            console.log(response.data.data.exerciseContent.code);
            if(response.data.data.solved !== EXERCISE_STATE[2])
            {
                customAxios.get(`/exercise/exerciseTry/${id}`).then((response)=>{
                    if(response.data.code === 200)
                    {
                        setTryCode(response.data.data);
                    }
                    else if(response.data.code === 204)
                    {
                        setTryCode("");
                    }
                    else alert("error");
                }).catch((error)=>{
                    alert(error.data.status);
                })
            }
        }).catch((error)=>{
            alert(error.data.status);
        })
    }, [id]);

    return (
        <>
            <ExerciseDetailInfo exerciseDetail={exerciseDetail} initCode={initCode} code={tryCode === "" ? code : tryCode} setCode={setCode}/>
        </>
    );
}

export default ExerciseDetail;
