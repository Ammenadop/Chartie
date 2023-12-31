import React, { useEffect, useState } from 'react';
import BarChart from '../components/Barcharts';
import { Slider } from "primereact/slider";
import { useDispatch, useSelector } from 'react-redux';
import { changed, fetchData, fetchDatas } from '../store/chartSlice';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
const Chart = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const [value, setValue] = useState(0);
    var data = useSelector((state) => state.chart.value);
    data = data.map((item) => ({
      ...item,
      value: item.value + (value < 99 ? 1 : 0), //1 because initially slider value is expected to be 1 
    }));
    const chng = (e) =>{
        setValue(e.value < 100 ? e.value : 99);
        dispatch(changed(e.value));
    }
    useEffect(() => {
      dispatch(fetchData());
      dispatch(fetchDatas());
    }, [dispatch]);
    const go = ()=>{
      navigate("/time");
    }
  return (
    <div style={{paddingTop:'7rem'}}>
      <h1>D3.js Bar Chart</h1>  
      <BarChart data={data} />
      <div className="card flex justify-content-center mt-4 flex-wrap">
         <Slider value={value} onChange={(e) => chng(e)} className="w-18rem" />
      </div>
      <h4>Slider Value : {value+1}</h4>
      <Button label="Time Series" onClick={()=>go()}/>
    </div>
  );
};

export default Chart;