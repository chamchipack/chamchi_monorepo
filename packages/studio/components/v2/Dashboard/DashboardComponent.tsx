import { Box, Tab, Tabs, Typography } from "@mui/material";
import CardComponent from "./lib/CardComponent";
import { useCallback, useEffect, useState } from "react";
import db from "@/api/module";
import { Student } from "@/v2/type/students";
import moment from "moment";
import ChartBox from "./lib/ChartBox";
import PaymentChart from "./lib/PaymentChart";
import ToggleButtons from "./lib/ToggleButtons";
import { useClientSize } from "package/src/hooks/useMediaQuery";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const DashboardComponent = () => {
  const [loading, setLoading] = useState(false);
  const [countComparing, setCountComparing] = useState({
    running: 0,
    total: 0,
  });
  const [countPaid, setCountPaid] = useState(0);
  const [countRegular, setCountRegular] = useState(0);
  const [countSession, setCountSession] = useState(0);

  const isMobile = useClientSize("sm");

  const getStudentRows = useCallback(async () => {
    const { data: studentItems = [] } = await db.search("student", {
      options: {},
    });

    const studentRows: Student[] = studentItems;
    const onCurrent = studentRows.filter(
      ({ currentStatus = false }) => currentStatus
    );

    setCountComparing({
      running: onCurrent.length || 0,
      total: studentRows.length,
    });

    const nonePaid = onCurrent.filter(
      ({ lessonBasedPayment: { isPaid = false } = {} }) => !isPaid
    );
    const regularTarget = onCurrent.filter(
      ({ regularPayment: { nextDueDate = "" } = {} }) =>
        nextDueDate === moment().format("YYYY-MM-DD")
    );
    setCountRegular(regularTarget.length);
    setCountPaid(nonePaid.length);

    DelayFunction();
  }, []);

  const getSessiontRows = useCallback(async () => {
    const { data: sessionRows = [] } = await db.search("session", {
      options: {},
    });

    setCountSession(sessionRows.length);
  }, []);

  const DelayFunction = async () => {
    setLoading(true);

    await delay(300);

    setLoading(false);
  };

  useEffect(() => {
    getSessiontRows();
    getStudentRows();
  }, [getStudentRows, getSessiontRows]);

  const componentHeight = () => (isMobile ? 140 : 180);

  return (
    <>
      <Box
        sx={{
          height: "100%",
          overflowY: isMobile ? "auto" : "hidden",
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            mr: isMobile ? 2 : 0,
            minHeight: {
              xs: 600,
              sm: "22%",
            },
            height: {
              xs: "80%",
              sm: "22%",
            },
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <CardComponent
            title="수업 현황"
            width={"100%"}
            height={componentHeight()}
            loading={loading}
            secondColor="secondary.main"
            firstColor="warning.main"
            shadow={0}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                px: 3,
                py: 3,
              }}
            >
              <Typography variant="caption" color="white">
                총 레슨 개수
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  color="white"
                  sx={{ fontSize: "50px" }}
                >
                  {countSession}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "end", pt: 4, ml: 2 }}>
                  <Typography
                    variant="caption"
                    color="white"
                    sx={{ fontSize: "12px" }}
                  >
                    레슨
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardComponent>

          <CardComponent
            title="재원 수 / 총원 수"
            width={"100%"}
            height={componentHeight()}
            loading={loading}
            shadow={0}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "row",
                px: 3,
                py: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mr: 5,
                }}
              >
                <Typography
                  variant="caption"
                  color="white"
                  sx={{ fontSize: "12px", mb: 1.5 }}
                >
                  재원
                </Typography>

                <Typography
                  variant="h4"
                  color="white"
                  sx={{ fontSize: "50px" }}
                >
                  {countComparing.running}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", mr: 2 }}>
                <Typography
                  variant="caption"
                  color="white"
                  sx={{ fontSize: "12px", mb: 1.5 }}
                >
                  등록 수
                </Typography>
                <Typography
                  variant="h4"
                  color="white"
                  sx={{ fontSize: "50px" }}
                >
                  {countComparing.total}
                </Typography>
              </Box>
            </Box>
          </CardComponent>

          <CardComponent
            title="정기결제 현황"
            width={"100%"}
            height={componentHeight()}
            loading={loading}
            firstColor="success.main"
            secondColor="success.main"
            shadow={0}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                px: 3,
                py: 3,
              }}
            >
              <Typography variant="caption" color="white">
                오늘 정기결제 대상자 수
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  color="white"
                  sx={{ fontSize: "50px" }}
                >
                  {countRegular}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "end", pt: 4, ml: 2 }}>
                  <Typography
                    variant="caption"
                    color="white"
                    sx={{ fontSize: "12px" }}
                  >
                    명
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardComponent>
          <CardComponent
            title="회차결제 현황"
            width={"100%"}
            height={componentHeight()}
            loading={loading}
            shadow={0}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                px: 3,
                py: 3,
              }}
            >
              <Typography variant="caption" color="white">
                회차결제 미결제 대상자 수
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  color="white"
                  sx={{ fontSize: "50px" }}
                >
                  {countPaid}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "end", pt: 4, ml: 2 }}>
                  <Typography
                    variant="caption"
                    color="white"
                    sx={{ fontSize: "12px" }}
                  >
                    명
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardComponent>
        </Box>

        <Box sx={{ mr: isMobile ? 2 : 0 }}>
          <ChartBox />
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "40%",
            display: "flex",
            mr: isMobile ? 2 : 0,
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <CardComponent
            loading={false}
            title="결제 현황"
            width={"100%"}
            height={300}
            firstColor="warning.main"
            secondColor="secondary.light"
            shadow={0}
          >
            <Box
              sx={{
                pt: 2,
                px: 2,
                height: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <PaymentChart />
              {!isMobile && <ToggleButtons />}
            </Box>
          </CardComponent>
        </Box>
      </Box>
    </>
  );
};

export default DashboardComponent;
