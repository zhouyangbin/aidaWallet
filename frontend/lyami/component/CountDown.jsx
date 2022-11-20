import React, { useState, useEffect } from "react";
import { Text } from "native-base";
import { handleFormatTime } from "../api/util/helper";

const handleCountDown = setNums => {
  const interval = setInterval(() => {
    setNums(state => {
        // console.log(state);
      if (state == 0) {
        clearInterval(interval);
      }
      return state - 1;
    });
  }, 1000);
};

const CountDown = props => {
  const { second } = props;
  const [num, setNums] = useState(second);
  useEffect(() => {
    handleCountDown(setNums);
    return () => {};
  }, [second]);

  return <Text>{handleFormatTime(num)}</Text>;
};

export default React.memo(CountDown);
