const { db } = require("../db");
const Address = db.Addresses;

exports.getAll = async (req, res) => {
  const addresses = await Address.findAll({ attributes: ["address"] });
  res.send(addresses);
};
exports.getById = async (req, res) => {
  const address = await Address.findByPk(req.params.id);

  if (address === 0 || address === undefined) {
    res.status(404).send({ error: "Address not found" });
    return;
  } else {
    res.status(200).send(address);
  }
};
exports.createNew = async (req, res) => {
  let address;
  try {
    address = await Address.create(req.body);
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      console.log(error);
      res.status(400).send({ error: error.errors.map((item) => item.message) });
    } else {
      console.log("AddressesCreate: ", error);
      res
        .status(500)
        .send({
          error:
            "Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up",
        });
    }
    return;
  }
  res
    .status(201)
    .location(`${getBaseUrl(req)}/addresses/${address.id}`)
    .json(address);
  console.log(address);
};

exports.deleteById = async (req, res) => {
  let result;
  try {
    result = await Address.destroy({ where: { id: req.params.id } });
  } catch (error) {
    console.log("AddressesDelete: ", error);
    res
      .status(500)
      .send({
        error:
          "Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up",
      });
    return;
  }
  if (result === 0 || result === undefined) {
    res.status(404).send({ error: "Address not found" });
  }
  res.status(204).send();
};
exports.updateById = async (req, res) => {
  let updatedAddress;
  delete req.body.id;
  try {
    updatedAddress = await Influencer.update(req.body, {
      where: { id: req.params.id },
    });
  } catch (error) {
    console.log("InfluencersUpdate: ", error);
    res
      .status(500)
      .send({
        error:
          "Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up",
      });
    return;
  }
  if (updatedAddress === 0 || updatedAddress === undefined) {
    res.status(404).send({ error: "Influencer not found" });
    return;
  }
  const address = await Address.findByPk(req.params.id);
  res
    .status(200)
    .location(`${getBaseUrl(req)}/ADDRESSES/${address.id}`)
    .json(address);
};
getBaseUrl = (request) => {
  return (
    (request.connection && request.connection.encryption ? "https" : "http") +
    `://${request.headers.host}`
  );
};
