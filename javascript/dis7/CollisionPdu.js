/**
 * Section 7.2.3 Collisions between entities shall be communicated by issuing a Collision PDU. COMPLETE
 *
 * Copyright (c) 2008-2015, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
// On the client side, support for a  namespace.
if (typeof dis === "undefined")
 dis = {};


// Support for node.js style modules. Ignored if used in a client context.
// See http://howtonode.org/creating-custom-modules
if (typeof exports === "undefined")
 exports = {};


dis.CollisionPdu = function()
{
   /** The version of the protocol. 5=DIS-1995, 6=DIS-1998, 7=DIS-2009. */
   this.protocolVersion = 7;

   /** Exercise ID */
   this.exerciseID = 0;

   /** Type of pdu, unique for each PDU class */
   this.pduType = 4;

   /** value that refers to the protocol family, eg SimulationManagement, et */
   this.protocolFamily = 1;

   /** Timestamp value */
   this.timestamp = 0;

   /** Length, in bytes, of the PDU */
   this.length = 0;

   /** PDU Status Record. Described in 6.2.67. This field is not present in earlier DIS versions  */
   this.pduStatus = 0;

   /** zero-filled array of padding */
   this.padding = 0;

   /** This field shall identify the entity that is issuing the PDU, and shall be represented by an Entity Identifier record (see 6.2.28). */
   this.issuingEntityID = new dis.EntityID(); 

   /** This field shall identify the entity that has collided with the issuing entity (see 5.3.3.4). This field shall be represented by an Entity Identifier record (see 6.2.28). */
   this.collidingEntityID = new dis.EntityID(); 

   /** This field shall contain an identification generated by the issuing simulation application to associate related collision events. This field shall be represented by an Event Identifier record (see 6.2.34). */
   this.eventID = new dis.EventIdentifier(); 

   /** This field shall identify the type of collision. The Collision Type field shall be represented by an 8-bit record of enumerations */
   this.collisionType = 0;

   /** some padding */
   this.pad = 0;

   /** This field shall contain the velocity (at the time the collision is detected) of the issuing entity. The velocity shall be represented in world coordinates. This field shall be represented by the Linear Velocity Vector record [see 6.2.95 item c)]. */
   this.velocity = new dis.Vector3Float(); 

   /** This field shall contain the mass of the issuing entity, and shall be represented by a 32-bit floating point number representing kilograms. */
   this.mass = 0;

   /** This field shall specify the location of the collision with respect to the entity with which the issuing entity collided. The Location field shall be represented by an Entity Coordinate Vector record [see 6.2.95 item a)]. */
   this.location = new dis.Vector3Float(); 

  dis.CollisionPdu.prototype.initFromBinary = function(inputStream)
  {
       this.protocolVersion = inputStream.readUByte();
       this.exerciseID = inputStream.readUByte();
       this.pduType = inputStream.readUByte();
       this.protocolFamily = inputStream.readUByte();
       this.timestamp = inputStream.readUInt();
       this.length = inputStream.readUShort();
       this.pduStatus = inputStream.readUByte();
       this.padding = inputStream.readUByte();
       this.issuingEntityID.initFromBinary(inputStream);
       this.collidingEntityID.initFromBinary(inputStream);
       this.eventID.initFromBinary(inputStream);
       this.collisionType = inputStream.readUByte();
       this.pad = inputStream.readByte();
       this.velocity.initFromBinary(inputStream);
       this.mass = inputStream.readFloat32();
       this.location.initFromBinary(inputStream);
  };

  dis.CollisionPdu.prototype.encodeToBinary = function(outputStream)
  {
       outputStream.writeUByte(this.protocolVersion);
       outputStream.writeUByte(this.exerciseID);
       outputStream.writeUByte(this.pduType);
       outputStream.writeUByte(this.protocolFamily);
       outputStream.writeUInt(this.timestamp);
       outputStream.writeUShort(this.length);
       outputStream.writeUByte(this.pduStatus);
       outputStream.writeUByte(this.padding);
       this.issuingEntityID.encodeToBinary(outputStream);
       this.collidingEntityID.encodeToBinary(outputStream);
       this.eventID.encodeToBinary(outputStream);
       outputStream.writeUByte(this.collisionType);
       outputStream.writeByte(this.pad);
       this.velocity.encodeToBinary(outputStream);
       outputStream.writeFloat32(this.mass);
       this.location.encodeToBinary(outputStream);
  };
}; // end of class

 // node.js module support
exports.CollisionPdu = dis.CollisionPdu;

// End of CollisionPdu class

