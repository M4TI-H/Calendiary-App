import { Fragment, useEffect, useState } from "react";
import { VStack, Text, Divider, HStack, Link } from "@chakra-ui/react";
import axios from "axios";

export default function CalendarPanel() {
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
    <VStack maxW="18rem" maxH="54rem" w={{base: "10rem", lg: "100%"}} h="100%" 
        align="center" p="5"
        bg="#F8F9FA" borderRightRadius="3xl" filter="auto" brightness="95%">
        <Text fontSize="xl" fontWeight="bold" color="#212529">Calendar</Text>

        {dates.map((date, id) => (
          <Fragment key={id}>
            <VStack w="100%" h="6rem">
              <HStack justify="space-between" w="100%" align="end">
                <Text fontSize="lg" fontWeight="semibold" color="#212529">{formatDate(date) !== dateNow ? date.toLocaleDateString("en-EN", { weekday: "long" }) : "Today"}</Text>
                <Text fontSize="sm" fontWeight="medium" color="#ADB5BD">{formatDate(date)}</Text>
              </HStack>
              {taskCounts[id] === 0 ?
                <Text fontSize="sm" color="#ADB5BD">No tasks for {date.toLocaleDateString("en-EN", { weekday: "long" })}!</Text>
                :
                taskCounts[id] === 1 ?
                  <Text fontSize="sm" color="#ADB5BD">You have a task!</Text>
                  :
                  <Text fontSize="sm" color="#ADB5BD">You have {taskCounts[id]} tasks!</Text>
              } 
            </VStack>

            {id < 6 && <Divider w="100%" borderY="1px solid #ADB5BD"/>}
          </Fragment>
          ))}
        <Link href="/calendar" variant="textButton">See more</Link>
      </VStack>
  );
}