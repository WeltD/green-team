import React from "react";
import { Steps as AntSteps } from "antd";
import {
  CarryOutOutlined,
  SearchOutlined,
  FundViewOutlined,
  LoadingOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const Steps = (props) => {
  const { current, status } = props;

  const selecIcon = () => {
    if (status === "error" && current === 0) {
      return <CloseCircleOutlined />;
    } else {
      return <CarryOutOutlined />;
    }
  };

  const analyzeIcon = () => {
    if (current === 1) {
      if (status === "process") {
        return <LoadingOutlined />;
      } else {
        return <CloseCircleOutlined />;
      }
    } else {
      return <SearchOutlined />;
    }
  };

  const visualizeIcon = () => {
    if (status === "error" && current === 2) {
      return <CloseCircleOutlined />;
    } else {
      return <FundViewOutlined />;
    }
  };

  return (
    <div>
      <AntSteps
        current={current}
        status={status}
        items={[
          {
            icon: selecIcon(),
            title: "Select date",
            description:
              "Select and submit the date, you can switch between daily and monthly view.",
          },
          {
            icon: analyzeIcon(),
            title: "Analyze data",
            description: "Please wait for data processing.",
          },
          {
            icon: visualizeIcon(),
            title: "Visualize data",
            description:
              "Visualize data using the Bar Chart and Line Chart.",
          },
        ]}
      />
    </div>
  );
};

export default Steps;
