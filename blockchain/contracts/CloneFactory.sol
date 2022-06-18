// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface Donation {
    function initialize(address _owner) external;
}

contract CloneFactory {
    address public donation;

    mapping(address => address[]) public allClones;

    event NewClone(address _newClone, address _owner);

    constructor(address _donation) {
        donation = _donation;
    }

    function clone(address _donation) internal returns (address instance) {
        assembly {
            let ptr := mload(0x40)
            mstore(
                ptr,
                0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000
            )
            mstore(add(ptr, 0x14), shl(0x60, _donation))
            mstore(
                add(ptr, 0x28),
                0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000
            )
            instance := create(0, ptr, 0x37)
        }
        require(instance != address(0), "ERC1167: create failed");
    }

    function _clone() external {
        address identitcalChild = clone(donation);
        allClones[msg.sender].push(identitcalChild);
        Donation(identitcalChild).initialize(msg.sender);
        emit NewClone(identitcalChild, msg.sender);
    }

    function returnClones(address _owner)
        external
        view
        returns (address[] memory)
    {
        return allClones[_owner];
    }
}
