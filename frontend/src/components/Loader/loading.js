import React, { useState, useEffect } from "react";
import Loading from "../Loader/loadingSVG.js";

function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState(null); // Descomente para usar na chamada de API real

  useEffect(() => {
    // Simulação de chamada de API
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  // Substitua o conteúdo deste div com a renderização dos dados reais
  return (
    <div>
      <h1>Data Loaded!</h1>
    </div>
  );
}

export default Loader;
