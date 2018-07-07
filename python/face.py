#!/usr/bin/python3

import cognitive_face as CF
import sys

def main():
	KEY = '8d23038c098e458ba0b04e7528b2c949'  # Replace with a valid Subscription Key here.
	CF.Key.set(KEY)

	BASE_URL = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/'  # Replace with your regional Base URL
	CF.BaseUrl.set(BASE_URL)

	person_group_id = 'rehive'
	
	def identify(img_url):
		# first detect the image
		faceId = [ids['faceId'] for ids in CF.face.detect(img_url)]
		if len(faceId) == 0:
			return None
		result = CF.face.identify(faceId, person_group_id)
		return result

	def getPersonsList():
		person_list = CF.person.lists(person_group_id)
		# print(person_list)
		return person_list

	def getGroupStatus():
		result = CF.person_group.get_status(person_group_id)
		# print(result)
		return result

	def getPersonId(person_name):
		person_list = getPersonsList()
		for person in person_list:
			if person['name'] == person_name:
				return person['personId']
		return None

	def addPerson(person_name):
		# print('Adding',person_name)
		return CF.person.create(person_group_id, person_name)['personId']

	def addPersonFace(person_id, img_url):
		result = CF.person.add_face(img_url,person_group_id,person_id)
		return result

	def trainPersonGroup():
		result = CF.person_group.train(person_group_id)
		# print(result)

	def deletePersonList():
		person_list = getPersonsList()
		for person in person_list:
			CF.person.delete(person_group_id, person['personId'])

	'''
	-a person_name img_url : Add a new person and his/her face
	-i person_name img_url : Get the confidence of a person in the group
	-s img_url             : Get a list of persons who look like the image
	-d                     : Delete everyone in the list
	-t                     : Train the group
	-l 					   : Get the person list
	'''
	if len(sys.argv) > 1:
		cmd = sys.argv[1]
		if cmd == '-a':
			#print('Adding person...')
			person_name = sys.argv[2]
			img_url = sys.argv[3]
			person_id = addPerson(person_name)
			addPersonFace(person_id, img_url)
			trainPersonGroup()
		elif cmd =='-i':
			person_name = sys.argv[2]
			img_url = sys.argv[3]
			person_id = getPersonId(person_name)
			results = identify(img_url)
			if results == None:
				sys.exit(1)
			for result in results:
				for candidate in result['candidates']:
					candidate_id = candidate['personId']
					if candidate_id == person_id:
						print(candidate['confidence'])
						sys.exit(0)
			sys.exit(1)
		elif cmd == '-s':
			img_url = sys.argv[2]
			results = identify(img_url)
			cand_list = list()
			for result in results:
				for candidate in result['candidates']:
					new_cand = dict()
					new_cand['id'] = CF.person.get(person_group_id, candidate['personId'])['name']
					new_cand['confidence'] = candidate['confidence']
					cand_list.append(new_cand)
			print(cand_list)
		elif cmd == '-d':
			# delete the list
			deletePersonList()
		elif cmd == '-t':
			trainPersonGroup()
		elif cmd == '-l':
			print(getPersonsList())
	sys.exit(0)
main()
sys.stdout.flush()




