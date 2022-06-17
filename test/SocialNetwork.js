const { assert } = require('chai')
// const { Item } = require('react-bootstrap/lib/breadcrumb')
const _deploy_contracts = require('../migrations/2_deploy_contracts')

const SocialNetwork = artifacts.require('./SocialNetwork.sol');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('SocialNetwork', ([deployer, author, tipper]) => {
    let socialNetwork

    before(async() =>{
        socialNetwork = await SocialNetwork.deployed();
    })

describe('deployment', async() => {
    it('deploys successfully', async() => {
        const address =  await socialNetwork.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    it('has a name', async() => {
        const name = await socialNetwork.name()
        assert.equal(name, 'Social Network')
    })
})

describe('posts', async() => {
    let result, postCount;

    // before(async()=>{
    //     result = await socialNetwork.createPost('Body of Post',{from: author});
    //     postCount = await socialNetwork.postCount();
    // })

    it('creates posts', async() => {
        result = await socialNetwork.createPost('This is my first post', {from: author})
        postCount = await socialNetwork.postCount()

        assert.equal(postCount, 1)
        const event = result.logs[0].args
        // console.log(event)
        assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
        assert.equal(event.content, 'This is my first post', 'content is correct')
        assert.equal(event.tipAmount, '0', 'tip amount is correct')
        assert.equal(event.author, author, 'author is correct')

        await socialNetwork.createPost('', {from: author}).should.be.rejected;
    })

    // it('lists posts', async() => {

    // })

    // it('tip posts', async() => {

    // })
})

})

