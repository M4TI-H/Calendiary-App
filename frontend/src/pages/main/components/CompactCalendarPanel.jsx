import { useEffect, useState } from "react";
import { VStack, Text, Divider, HStack, Link } from "@chakra-ui/react";
import axios from "axios";

export default function CompactCalendarPanel() {
  let dateNow = formatDate(new Date());
  const [dates, setDates] = useState([]);
  const [taskCounts, setTaskCounts] = useState([]);
  const token = localStorage.getItem("accessToken");

  function formatDate(date) {
    const dateOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric"
    };
  
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    date.setHours(0, 0, 0, 0);
    return date.toLocaleString("en-GB", dateOptions).replace(",", "");
  }

  async function fetchTaskCount(date) {
    try {
      const res = await axios.get(`http://localhost:8000/todo/fetch_task_count/${date}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.counts;
    }
    catch(err) {
      console.error(`error: ${err.message}`);
    }
  }

  async function assignTaskInfo() {
    let dateNow = new Date();
    let forwardDates = [];
    let tasks = [];
    for (let i = 0; i < 7; i++){
      let nextDay = new Date(dateNow);
      nextDay.setDate(dateNow.getDate() + i)
      forwardDates.push(nextDay);

      tasks.push(fetchTaskCount(nextDay));
    }
    const res_tasks = await Promise.all(tasks);
    setDates(forwardDates);
    setTaskCounts(res_tasks);
  } 

  useEffect(() => {
    assignTaskInfo();
  }, [])

  return (
    <HStack h="5rem" w="100%" align="center" top="0" spacing="0" justify="space-around"
        bg="#F8F9FA" borderBottomRadius="lg" filter="auto" brightness="95%">

        {dates.map((date, id) => (
            <VStack w="3rem" h="4rem" key={id} spacing="0" bg={formatDate(date) === formatDate(new Date()) && "red"} borderRadius="lg">
              <Text fontSize="lg" fontWeight="semibold" color="#212529">{date.toLocaleDateString("en-EN", { weekday: "short" })}</Text>
              <Text fontSize="md" fontWeight="medium" color="#ADB5BD">{date.toLocaleDateString("en-EN", { day: "numeric" })}</Text>
            </VStack>
          ))}
      </HStack>
  );
}