import React, { useState } from "react";
import { Breadcrumb, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Home = () => {
  return (
    <div>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>
          <Link to={"/"}>Home</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Typography>
        <Title>Bristol Airport Data Analysis System</Title>
      </Typography>
    </div>
  );
};

export default Home;
