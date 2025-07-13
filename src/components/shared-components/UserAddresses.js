import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Badge, Row, Col, Button, Form, Input, Space, Radio, Select } from "antd";
import { FaPlusCircle, FaRegListAlt } from "react-icons/fa";

import UserService from "services/UserService";
import LibraryService from "services/LibraryService";
import Loading from "components/shared-components/Loading";
import confirmButton from "utils/confirmButton";

const { Option } = Select;

const AddressItem = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { address, badge } = props;

  const showSelector = typeof props.onSelectAddress === "function" ? true : false;

  const selectAddress = () => {
    setIsLoading(true);
    if (typeof props.onSelectAddress === "function") {
      props.onSelectAddress(address.id, address);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  // useEffect(() => { }, []);

  return (
    <>
      <div className="p-2" onClick={selectAddress} bordered="false">
        <Badge.Ribbon text={badge} color="green" className={badge ? `` : `d-none`}>
          <div>
            <Card className="shadow-sm">
              <div className="p-2 border-bottom">
                {address.address_line_1} {address.address_line_2.trim() !== "" ? `, ${address.address_line_2}` : ``}
              </div>
              <div className="p-2 border-bottom">
                {address.postcode} {address.postcode.trim() !== "" ? `, ` : ``} {address.city?.city}
              </div>
              <div className="p-2 border-bottom">{address.city?.country?.country}</div>
              {showSelector && (
                <Row className="mt-4">
                  <Col xs={24} md={{ span: 12, offset: 12 }} xl={{ span: 8, offset: 16 }}>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <>
                        <Button
                          block
                          className="bg-dark text-white"
                          onClick={(btn) => {
                            confirmButton(
                              btn.currentTarget,
                              () => {
                                message.success(`You have confirmed`);
                              },
                              "bg-dark",
                              "Confirm",
                              "bg-danger",
                            );
                          }}>
                          Select
                        </Button>
                      </>
                    )}
                  </Col>
                </Row>
              )}
            </Card>
          </div>
        </Badge.Ribbon>
      </div>
    </>
  );
};

const AddAddressForm = (props) => {
  const [form] = Form.useForm();
  const [shared, setShared] = useState(true);
  const [sharedAddresses, setSharedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const { cityId, userId } = props;

  useEffect(() => {
    getSharedAddresses();
  }, []);

  const getSharedAddresses = () => {
    let params = {};
    params.city_id = cityId;
    LibraryService.getSharedAddresses(params)
      .then((response) => {
        setSharedAddresses(response);
      })
      .catch((error) => {
        setSharedAddresses([]);
        setShared(false);
      });
  };

  const handleSubmitSharedAddress = (value) => {
    const address = sharedAddresses.filter((add) => {
      return add.id === value.shared_address;
    });
    const data = {
      address_line_1: address[0].address_line_1,
      address_line_2: address[0].address_line_2,
      postcode: address[0].postcode,
      city_id: cityId,
      user_id: userId,
    };

    UserService.createUserAddressees(data)
      .then((response) => {
        if (typeof props.onSelectAddress === "function") {
          props.onSelectAddress(response.id, response);
        }
      })
      .catch((error) => {});
  };

  const onSelect = (value) => {
    const address = sharedAddresses.filter((add) => {
      return add.id === value;
    });

    setSelectedAddress(`${address[0].address_line_1}, ${address[0].address_line_2}, ${address[0].postcode}`);
  };

  // const onChangeRadio = (e: RadioChangeEvent) => {
  const onChangeRadio = (e) => {
    setShared(e.target.value);
  };

  const onFinishNewAddress = (values) => {
    const latlng = {
      lat: values.lat,
      lng: values.lng,
    };
    const data = {
      address_line_1: values.address_line_1,
      address_line_2: values.address_line_2,
      postcode: values.postcode,
      latlng: JSON.stringify(latlng),
      city_id: cityId,
      user_id: userId,
    };

    UserService.createUserAddressees(data)
      .then((response) => {
        if (typeof props.onSelectAddress === "function") {
          props.onSelectAddress(response.id, response);
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      <Radio.Group onChange={onChangeRadio} value={shared} style={{ width: "100%" }}>
        <Space direction="vertical" style={{ width: "90%" }}>
          <Radio value={true}>Shared Address</Radio>
          {shared && sharedAddresses.length > 0 && (
            <Form name="validate_other" form={form} onFinish={handleSubmitSharedAddress}>
              <Form.Item
                name="shared_address"
                // label="Shared Address"
                rules={[
                  {
                    required: false,
                    message: "Please select Shared Address",
                  },
                ]}>
                <Select
                  showSearch
                  onSelect={(value) => onSelect(value)}
                  style={{ width: "100%" }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }>
                  {sharedAddresses
                    ? sharedAddresses.map((addresses) => {
                        return (
                          <Option value={addresses.id}>
                            {addresses.label}
                            {/* {addresses.address_line_1}, {addresses.address_line_2}, {addresses.postcode} */}
                          </Option>
                        );
                      })
                    : ""}
                </Select>
              </Form.Item>
              {selectedAddress !== "" && <div className="pb-2 px-2">Address: {selectedAddress}</div>}
              <Button type="primary" htmlType="submit">
                Select Address
              </Button>
            </Form>
          )}
          <Radio value={false}>New Address</Radio>
          {!shared && (
            <Form name="basicInformation" layout="vertical" form={form} onFinish={onFinishNewAddress}>
              <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Form.Item
                    label="Address Line 1"
                    name="address_line_1"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Address Line!",
                      },
                    ]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Address Line 2"
                    name="address_line_2"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Address Line!",
                      },
                    ]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Post Code"
                    name="postcode"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Post Code!",
                      },
                    ]}>
                    <Input />
                  </Form.Item>
                  <Row justify="space-between">
                    <Col span={11}>
                      <Form.Item label="Lat" name="lat">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item label="Lng" name="lng">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button type="primary" htmlType="submit">
                    Create Address
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Space>
      </Radio.Group>
    </>
  );
};

const UserAddresses = (props) => {
  const [segment, setSegment] = useState("select-address");
  const [addresses, setAddresses] = useState([]);
  const [activeAddress, setActiveAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshAddresses, setRefereshAddresses] = useState(true);

  const { addressId, cityId, userId } = props;
  const { user, accessList, loggedInAs } = useSelector((state) => state.auth);

  const getListOfAddresses = () => {
    setIsLoading(true);
    const params = { user_id: userId || user?.id || 0 };
    if (cityId) {
      params.city_id = cityId;
    }

    UserService.getUserAddresses(params)
      .then((response) => {
        setAddresses(sortAddressList(response));
        setRefereshAddresses(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setAddresses([]);
        setRefereshAddresses(false);
        setIsLoading(false);
      });
  };

  const sortAddressList = (list) => {
    // <-- insert code to sort list by country, city (alphabetical order)
    return list;
  };

  const findAddress = (id) => {
    if (id && addresses.length) {
      return addresses.find((address) => address.id === id);
    }
  };

  const selectAddress = (id, selectedAddress = {}) => {
    if (typeof props.onSelectAddress === "function") {
      props.onSelectAddress(id, selectedAddress);
    }
  };

  useEffect(() => {
    setActiveAddress(findAddress(addressId) || null);
    setSegment(addresses.length > 0 ? `select-address` : `add-address`);
  }, [addressId, addresses]);

  useEffect(() => {
    if (refreshAddresses) {
      getListOfAddresses();
    }
  }, [refreshAddresses]);

  return (
    <>
      <div className={`${segment !== "select-address" ? `d-none` : ``}`}>
        <div
          className="text-right mb-2 cursor-pointer"
          onClick={() => {
            setSegment("add-address");
          }}>
          <FaPlusCircle className="mr-2" /> Create new address
        </div>
        {activeAddress && (
          <>
            <AddressItem address={activeAddress} badge="Selected" />
          </>
        )}
        {addresses &&
          addresses.map((address, index) => {
            if (address.id !== addressId) {
              return <AddressItem key={index} address={address} onSelectAddress={selectAddress} />;
            }
          })}
      </div>
      <div className={`${segment !== "add-address" ? `d-none` : ``}`}>
        <div
          className="text-right mb-2 cursor-pointer"
          onClick={() => {
            setSegment("select-address");
          }}>
          <FaRegListAlt className="mr-2" /> Select from Addressbook
        </div>
        <div>
          <AddAddressForm userId={userId} cityId={cityId} onSelectAddress={selectAddress} />
        </div>
      </div>
    </>
  );
};

export default UserAddresses;
