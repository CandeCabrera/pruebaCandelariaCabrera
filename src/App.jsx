import { useEffect, useState } from "react";
import "./App.css";
import companyLogo from "./assets/2.png";
import hero from "./assets/hero2.png";
import api from "./api";

function App() {
  //const types = ["Nombre", "Razón Social", "NIT", "Teléfono", "Código"];

  const [companies, setCompanies] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [razonSocial, setRazonSocial] = useState("");
  const [nombre, setNombre] = useState("");
  const [nit, setNit] = useState(null);
  const [telefono, setTelefono] = useState(null);
  const [codigo, setCodigo] = useState(null);
  const [logo, setLogo] = useState("");
  const [id, setId] = useState("")
  
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
    let array = rs.trim().split(" ");
    array.pop();
    let companyName = array.join(" ");
    return companyName;
  };

  const handleItem = (company) => {
    api
      .get(`/Companies/${company.id}/.json`)
      .then((res) => {
        setLogo(res.data.logo);
        setNombre(res.data.nombre);
        setNit(res.data.nit);
        setRazonSocial(res.data.razonSocial);
        setTelefono(res.data.telefono);
        setCodigo(res.data.codigo);
        setId(company.id)
      })
      .catch(() => console.log("no funciona"));
  };

  const body = {
    codigo,
    razonSocial,
    nombre,
    telefono,
    nit,
    logo
  }

  console.log("body", body);

  const submit = (e)=>{
    e.preventDefault()
    api.put(`/Companies/${id}/.json`, body)
    .then(()=> {
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
    })
    
    .then(() => console.log(companies));
    setPopUp(false)
  }
  

  return (
    <div className="App">
      <nav>
        <img src={companyLogo} width="60px" />
      </nav>
      <div className="hero-container">
        <img src={hero} />
      </div>
      <p className="hero-paragraph">
        Encuentra aquí toda la información necesaria de las empresas con las que
        trabajamos.
      </p>
      <div className="sel select-container">
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
          <input
            type="text"
            placeholder="   Ingresa el dato"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </form>
      </div>

      {inputValue ? (
        <ul>
          {Object.values(filterSearch).map((company) => (
            <li
              key={company.id}
              onClick={() => {
                handleItem(company);
                setPopUp(true);
              }}
            >
              <img src={company.logo} width="80px" />
              <div>
                <h4>{handleRS(company.razonSocial)}</h4>
                <p>
                  <b>{`${selectValue.toUpperCase()}: `}</b>{" "}
                  {company[selectValue]}
                </p>
              </div>
            </li>
          ))}{" "}
        </ul>
      ) : (
        <ul>
          {companies.map((company) => (
            <li
              key={company.id}
              onClick={() => {
                handleItem(company);
                setPopUp(true);
              }}
            >
              <img src={company?.logo} width="80px" />
              <div>
                <h4>{handleRS(company.razonSocial)}</h4>
                <p>
                  {selectValue ? (
                    <p>
                      <b>{`${selectValue.toUpperCase()}: `}</b>{" "}
                      {company[selectValue]}
                    </p>
                  ) : (
                    <p>
                      <b>NIT: </b> {company.nit}
                    </p>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div
        className="popUp"
        style={{ visibility: popUp ? "visible" : "hidden" }}
      >
        <div>
          <i onClick={() => setPopUp(false)} className="fa-solid fa-x"></i>
          <img src={logo} width="180px" />
          <form className="popUp-form" onSubmit={submit}>
            <input
              type="text"
              placeholder="Razón Social"
              value={razonSocial}
              onChange={(e) => setRazonSocial(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="text"
              placeholder="NIT"
              value={nit}
              onChange={(e) => setNit(e.target.value)}
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            <input
              type="text"
              placeholder="Código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            <button type="submit">ACTUALIZAR</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
