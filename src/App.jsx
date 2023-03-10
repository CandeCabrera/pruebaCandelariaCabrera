import { useEffect, useState } from "react";
import "./App.css";
import companyLogo from "./assets/2.png";
import hero from "./assets/hero2.png";
import api from "./api";

function App() {
  const [companies, setCompanies] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [razonSocial, setRazonSocial] = useState("");
  const [nombre, setNombre] = useState("");
  const [nit, setNit] = useState("");
  const [telefono, setTelefono] = useState("");
  const [codigo, setCodigo] = useState("");
  const [logo, setLogo] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    api.get("/Companies.json").then(({ data }) => {
      const empresas = [];
      for (const id of Object.keys(data)) {
        empresas.push({
          id,
          ...data[id],
        });
      }
      if (seeMore) {
        setCompanies(empresas);
      } else {
        setCompanies(empresas.splice(0, 20));
      }
    });
  }, [seeMore]);

  const filterSearch = Object.values(companies).filter((item) =>
    String(item[selectValue]).toLowerCase().startsWith(inputValue.toLowerCase())
  );

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
        setId(company.id);
      })
      .catch((error) => console.log(error));
  };

  

  const body = {
    codigo,
    razonSocial,
    nombre,
    telefono,
    nit,
    logo,
  };

  const submit = (e) => {
    e.preventDefault();
    api.put(`/Companies/${id}/.json`, body).then(() => {
      api.get("/Companies.json").then(({ data }) => {
        const empresas = [];
        for (const id of Object.keys(data)) {
          empresas.push({
            id,
            ...data[id],
          });
        }
        setCompanies(empresas);
      });
    });
    setPopUp(false);
    setLogo("")
  };

  return (
    <div className="App">
      <nav>
        <img src={companyLogo} width="60px" />
      </nav>
      <section className="hero-container">
        <img src={hero} />
      </section>
      <p className="hero-paragraph">
        Aqu?? puedes encontrar toda la informaci??n necesaria de las empresas con
        las que trabajamos. La raz??n social, el nombre del representante legal,
        el NIT, el tel??fono y nuestro c??digo interno de la compa????a.
      </p>
      <div className="sel select-container">
        <select onChange={(e) => setSelectValue(e.target.value)}>
          <option selected disabled hidden>
            BUSCAR POR
          </option>
          <option value="nombre">Nombre</option>
          <option value="razonSocial">Raz??n Social</option>
          <option value="nit">NIT</option>
          <option value="telefono">Tel??fono</option>
          <option value="codigo">C??digo</option>
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
              <img src={company.logo} width="100px" />
              <div>
                <h4>{company.razonSocial}</h4>

                <div className="grid-list">
                  <i className="fa-regular fa-user"></i>
                  <i className="fa-solid">NIT</i>
                  <i className="fa-solid fa-phone"></i>
                  <i className="fa-solid fa-qrcode"></i>
                  <p>{company.nombre}</p>
                  <p>{company.nit}</p>
                  <p>{company.telefono}</p>
                  <p>{company.codigo}</p>
                </div>
              </div>
              <div className="edit-hover">EDITAR</div>
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
              <img src={company?.logo} width="100px" />
              <div>
                <h4>{company.razonSocial}</h4>
                <div className="grid-list">
                  <i className="fa-regular fa-user"></i>
                  <i className="fa-solid">NIT</i>
                  <i className="fa-solid fa-phone"></i>
                  <i className="fa-solid fa-qrcode"></i>
                  <p>{company.nombre}</p>
                  <p>{company.nit}</p>
                  <p>{company.telefono}</p>
                  <p>{company.codigo}</p>
                </div>
              </div>
              <div className="edit-hover">EDITAR</div>
            </li>
          ))}
          <div className="see-more" onMouseOver={() => setSeeMore(true)}>
            VER MAS
          </div>
        </ul>
      )}

      <div
        className="popUp"
        style={{ visibility: popUp ? "visible" : "hidden" }}
      >
        <div>
          <i onClick={() => {
            setPopUp(false)
            setLogo("")}} className="fa-solid fa-x"></i>
          <img src={logo} width="180px" />
          <form className="popUp-form" onSubmit={submit}>
           
            <div>
            <i className="fa-regular fa-building"></i>
            <input
              type="text"
              placeholder="Raz??n Social"
              value={razonSocial}
              onChange={(e) => setRazonSocial(e.target.value)}
            />
            </div>
            <div>
            <i className="fa-regular fa-user"></i>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            </div>
            <div>
            <i className="fa-solid">NIT</i>
            <input
              type="text"
              placeholder="NIT"
              value={nit}
              onChange={(e) => setNit(e.target.value)}
            />
            </div>
            <div>
            <i className="fa-solid fa-phone"></i>
            <input
              type="text"
              placeholder="Tel??fono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            </div>
            <div>
            <i className="fa-solid fa-qrcode"></i>
            <input
              type="text"
              placeholder="C??digo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            </div>
           
           
          
            
          
            <button type="submit">ACTUALIZAR</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
