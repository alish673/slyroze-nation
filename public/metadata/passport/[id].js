export default function handler(req, res) {
  const { id } = req.query;

  if (parseInt(id) < 1 || parseInt(id) > 1000000) {
    return res.status(404).json({ error: "Invalid passport ID" });
  }

  res.status(200).json({
    name: `Slyroze Passport #${id}`,
    description: "A digital collectible from the Slyroze Nation. This NFT is a symbolic ID within the ecosystem.",
    image: "https://slyroze.com/assets/passport-card.png",
    attributes: [
      { trait_type: "Type", value: "Passport" },
      { trait_type: "Collection", value: "Slyroze Nation" },
      { trait_type: "Utility", value: "Digital Identity" },
      { trait_type: "Supply", value: "Limited to 1,000,000" }
    ],
    external_url: "https://slyroze.com/nation"
  });
}
