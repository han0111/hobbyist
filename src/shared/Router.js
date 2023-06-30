import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Detail from "../pages/detail";
import Mypage from "../pages/mypage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/mypage/:id" element={<Mypage />} />
          
//우정님이 하신부분
//         <Route path="/detail" element={<Detail />} />
//         <Route path="/mypage" element={<Mypage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
