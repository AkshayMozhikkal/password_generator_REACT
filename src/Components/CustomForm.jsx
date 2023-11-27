import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import cryptoRandomString from "crypto-random-string";

import { useState } from "react";

export function CustomForm() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [requirements, setRequirements] = useState({
    length: 10,
    symbols: false,
    uppercase: false,
    numbers: false,
  });
  const [password, setPassword] = useState(null);

  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);

  const generatePassword = () => {
    const parsedLength = parseInt(requirements.length, 10);

    if (isNaN(parsedLength) || parsedLength < 6 || parsedLength > 30) {
      handleOpen();
      setRequirements({ ...requirements, length: parsedLength });
      return;
    }

    const characterSet = "abcdefghijklmnopqrstuvwxyz";
    const UppercharacterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbolSet = "!@#$%^&*()-_=+[]{}|;:,.<>?";
    const numberSet = "0123456789";

    let finalCharacterSet = characterSet;

    if (requirements.symbols) {
      finalCharacterSet += symbolSet;
    }
    if (requirements.uppercase) {
      finalCharacterSet += UppercharacterSet;
    }

    if (requirements.numbers) {
      finalCharacterSet += numberSet;
    }

    const newPassword = cryptoRandomString({
      length: parsedLength,
      characters: finalCharacterSet,
    });

    setPassword(newPassword);
  };
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => setOpen2(true))
      .catch((err) => console.error("Unable to copy to clipboard", err));
  };

  return (
    <div>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="light-blue">
          Password Generator
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Please Enter your requirements to generate a password.
        </Typography>
        <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Length of Password:
            </Typography>
            <Input
              onChange={(e) =>
                setRequirements({
                  ...requirements,
                  [e.target.name]: parseInt(e.target.value, 10),
                })
              }
              name="length"
              value={requirements.length}
              size="lg"
              type="number"
              placeholder="enter a number"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Checkbox
            checked={requirements.numbers}
            onChange={(e) =>
              setRequirements({
                ...requirements,
                numbers: e.target.checked,
              })
            }
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                Need Numbers in password?
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Checkbox
            checked={requirements.symbols}
            onChange={(e) =>
              setRequirements({
                ...requirements,
                symbols: e.target.checked,
              })
            }
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                Need Special Characters in password?
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Checkbox
            checked={requirements.uppercase}
            onChange={(e) =>
              setRequirements({
                ...requirements,
                uppercase: e.target.checked,
              })
            }
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                Need UpperCase in password?
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            className="mt-6 bg-blue-100 text-teal-600"
            fullWidth
            onClick={() => generatePassword()}
          >
            Generate
          </Button>
          {password && (
            <Typography
              color="green"
              className="mt-4 text-center text-2xl font-bold"
            >
              Password Generated :{"  "}
              <Tooltip content="Copy to clipboard">
                <a
                  href="#"
                  className="text-2xl hover:text-blue-800 text-gray-800 font-bold"
                  onClick={copyToClipboard}
                >
                  {password}
                </a>
              </Tooltip>
            </Typography>
          )}
        </div>
      </Card>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>VERIFY..!!</DialogHeader>
        <DialogBody>
          Password length must be a non-negative number and at least 6 and max
          30..!!
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>OK</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog open={open2} handler={handleOpen2}>
        <DialogHeader>Copied..!!</DialogHeader>
        <DialogBody>Password Copied to ClipBoard..!!</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="green"
            onClick={handleOpen2}
            className="mr-1"
          >
            <span>OK</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
