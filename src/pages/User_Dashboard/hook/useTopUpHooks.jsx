import { useState } from "react"

export default () => {
  const [airtimeShow, setAirtimeShow] = useState(false)
  const [dataShow, setDataShow] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [key, seKey] = useState(
    "pk_test_5ad7e69445b17b617696e6e2587eba66c1a0b066"
  )

  const ToggleAirtime = () => {
    setAirtimeShow(!airtimeShow)
  }
  const ToggleData = () => {
    setDataShow(!dataShow)
  }
  const handleDisabled = () => {
    setDisabled(!disabled)
  }

  return [
    airtimeShow,
    dataShow,
    ToggleAirtime,
    ToggleData,
    disabled,
    handleDisabled,
    key,
  ]
}
