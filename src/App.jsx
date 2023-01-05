import { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/2.png";
import hero from "./assets/hero2.png";
import api from "./api";

function App() {
  //const types = ["Nombre", "Razón Social", "NIT", "Teléfono", "Código"];

  const [companies, setCompanies] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    api
      .get("/Companies.json")
      .then(({ data }) => {
        const empresas = [];
        for (const id of Object.keys(data)) {
          empresas.push({
            id,
            ...data[id],
          });
        }
        setCompanies(empresas);
      })
      .then(() => console.log(companies));
  }, []);

  const filterSearch = Object.values(companies).filter((item) =>
    String(item[selectValue]).toLowerCase().startsWith(inputValue.toLowerCase())
  );

  const handleRS = (rs) => {
    let array = rs.trim().split(" ")
    array.pop()
    let companyName = array.join(" ")
    return companyName
  }

  // console.log("SELECT VALUE", selectValue);
  // console.log("INPUT VALUE", inputValue);

  return (
    <div className="App">
      <nav>
        <img src={logo} width="60px" />
      </nav>
      <div className="hero-container">
        <img src={hero} />
      </div>
      <p className="hero-paragraph">
        Encuentra aquí toda la información necesaria de las empresas con las que
        trabajamos.
      </p>
      <div className="select-container">
        <select onChange={(e) => setSelectValue(e.target.value)}>
          <option selected disabled hidden>
            BUSCAR POR
          </option>
          <option value="nombre">Nombre</option>
          <option value="razonSocial">Razón Social</option>
          <option value="nit">NIT</option>
          <option value="telefono">Teléfono</option>
          <option value="codigo">Código</option>
        </select>

        <form>
          <input type="text" placeholder="   Ingresa el dato" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
          <i className="fa-solid fa-magnifying-glass"></i>
        </form>
      </div>

      {
        inputValue ? (<ul>
          {Object.values(filterSearch).map((company) => (
            <li key={company.id}>
              <img src={company.logo} width="80px" />
              <div>
                <h4>{handleRS(company.razonSocial)}</h4>
                <p>
                  <b>{`${selectValue.toUpperCase()}: `}</b> {company[selectValue]}
                </p>
              </div>
            </li>
            
          ))} </ul>
        ): (<ul>
          {companies.map((company) => (
            <li key={company.id}>
              <img src={company.logo} width="80px" />
              <div>
                <h4>{handleRS(company.razonSocial)}</h4>
                <p>
                  {
                    selectValue ? (<p><b>{`${selectValue.toUpperCase()}: `}</b> {company[selectValue]}</p>) : (<p><b>NIT: </b> {company.nit}</p>)
                  }
                </p>
              </div>
            </li>
          ))}
        </ul>)
      }

      
    </div>
  );
}

export default App;
