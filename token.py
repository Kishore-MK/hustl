from stellar_sdk import Asset, Keypair, Network, Server, TransactionBuilder

# Configure Stellar SDK to talk to the Horizon instance hosted by SDF
# To use the live network, set the hostname to horizon_url for mainnet
server = Server(horizon_url="https://horizon-testnet.stellar.org")
# Use test network, if you need to use public network, please set it to `Network.PUBLIC_NETWORK_PASSPHRASE`
network_passphrase = Network.TESTNET_NETWORK_PASSPHRASE

# Keys for accounts to issue and receive the new asset
issuerKeypair = Keypair.from_secret(
    "SBQTOSN26OUYILSPQHMGOCNLLNZFAYYSW3LQDZOQM6SCN5C7XQFDBW4Y"
)
issuer_public = issuerKeypair.public_key

distributor_keypair = Keypair.from_secret(
    "SCPX3AFVAMB4TNR4KDV4DSSVBWJZDXHHO35TNLDUCB2JNGZ7NVYL7N2B"
)
distributor_public = distributor_keypair.public_key

# Transactions require a valid sequence number that is specific to this account.
# We can fetch the current sequence number for the source account from Horizon.
distributor_account = server.load_account(distributor_public)

# Create an object to represent the new asset
hustl = Asset("HUSTL", issuer_public)

# First, the receiving account must trust the asset
trust_transaction = (
    TransactionBuilder(
        source_account=distributor_account,
        network_passphrase=network_passphrase,
        base_fee=100,
    )
    #  The `changeTrust` operation creates (or alters) a trustline
    #  The `limit` parameter below is optional
    .append_change_trust_op(asset=hustl, limit="1000")
    .set_timeout(100)
    .build()
)

trust_transaction.sign(distributor_keypair)
trust_transaction_resp = server.submit_transaction(trust_transaction)
print(f"Change Trust Transaction Resp:\n{trust_transaction_resp}")

issuer_account = server.load_account(issuer_public)
# Second, the issuing account actually sends a payment using the asset.
payment_transaction = (
    TransactionBuilder(
        source_account=issuer_account,
        network_passphrase=network_passphrase,
        base_fee=100,
    )
    .append_payment_op(
        destination=distributor_public,
        asset=hustl,
        amount="100",
    )
    .build()
)
payment_transaction.sign(issuerKeypair)
payment_transaction_resp = server.submit_transaction(payment_transaction)
print(f"Payment Transaction Resp:\n{payment_transaction_resp}")