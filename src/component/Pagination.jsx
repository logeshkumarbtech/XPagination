import { useState } from "react";
import style from "./Pagination.module.css";
import { useEffect } from "react";
import axios from "axios"

export default function Pagination() {
    const [currentPage,setCurrentPage] =useState(1);
    const recordPerPage =10;   
  const [empData, setEmpData] = useState([]);

  const totalPage = Math.floor(empData.length/recordPerPage);

  const indexOfLastItem = currentPage * recordPerPage;
  const indexOfFirstItem = indexOfLastItem - recordPerPage;

  const currentPageItems = empData.slice(indexOfFirstItem,indexOfLastItem);
  console.log(currentPageItems)

  const callApi = async() => {  
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        console.log(response.data)
        setEmpData(response.data)
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    const goBack =()=>{
        if(currentPage>1)
        setCurrentPage((prevCurrentPage)=>prevCurrentPage-1);
    }
    const goNext =()=>{
        if(currentPage<=totalPage)        
        setCurrentPage((prevCurrentPage)=>prevCurrentPage+1);
    }


    useEffect(() => {
      callApi();
    }, []);

    return (
      <div className={style.container}>
        <h1>Employee Data Table</h1>
        <div className={style.table}>
          <table>
            <thead>
              <tr className={style.tableRow}>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
                {currentPageItems.map((data) => (                  
                    <tr className={style.tableDataRow} key={data.id}>
                        <td>{data.id}</td>
                        <td >{data.email}</td>
                        <td >{data.name}</td>
                        <td >{data.role}</td>
                    </tr>                   
                ))}
            </tbody>
          </table>
        </div>
        <div className={style.buttons}>
            <button onClick={goBack}>Previous</button>
            <button >{currentPage}</button>
            <button onClick={goNext}>Next</button>
        </div>
      </div>
    );
  };

